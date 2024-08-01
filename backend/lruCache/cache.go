package lruCache

import (
	"fmt"
)

// Cache client for AWS Secret manager secrets
type Cache struct {
	lru *lruCache
	cacheConfig
}

func newCacheClient(cfg *limitCfg) (*Cache, error) {
	cache := &Cache{
		//Initialize default configuration
		cacheConfig: cacheConfig{
			MaxCacheSize: 1000,
			CacheItemTTL: 360000,
		},
	}
	//Initialize lru cache
	cache.lru = newLRUCache(cache.MaxCacheSize)
	return cache, nil
}

// Get retrieves the value associated with the given key from the cache.
// If the key is found in the cache, the corresponding value and nil error will be returned.
// If the key is not found, the zero value of the value type and an error will be returned.
func (c *Cache) Get(secretId string) *CacheItem {
	lruValue, found := c.lru.get(secretId)
	if !found {
		return nil
	}

	out, _ := lruValue.(*CacheItem)
	return out
}

// ListKeys retrievesall the keys present in cache.
func (c *Cache) ListKeys() []string {
	return c.lru.listKeys()
}

// Flush removes all the items present in cache.
func (c *Cache) Flush() {
	c.lru.flush()
}

// Put stores the provided value under the given key in the cache.
// If the key already exists in the cache, the associated value will be updated.
func (c *Cache) Put(secretId string, value any) (*CacheItem, error) {
	item := newCacheItem(c.cacheConfig, secretId, value)
	ok := c.lru.putIfAbsent(secretId, &item)
	if !ok {
		c.Delete(secretId)
		return c.Put(secretId, value)
	}
	lruValue, _ := c.lru.get(secretId)
	out, _ := lruValue.(*CacheItem)
	return out, nil
}

// Delete removes the key-value pair associated with the given key from the cache.
// If the key is found in the cache, it will be deleted, and a nil error will be returned.
// If the key is not found, an error will be returned.
// This method is thread-safe.
func (c *Cache) Delete(key string) error {
	deleted := c.lru.delete(key)
	if !deleted {
		return fmt.Errorf("key %v not found", key)
	}

	return nil
}
