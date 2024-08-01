package lruCache

import (
	"fmt"
	"math/rand"
	"time"
)

type CacheItem struct {
	Id              string
	Value           any
	nextRefreshTime int64
	config          cacheConfig
}

// newSecretCacheItem initializes a CacheItem using default cache size and sets next refresh time to now
func newCacheItem(config cacheConfig, id string, response any) CacheItem {
	cItem := CacheItem{
		Id:     id,
		Value:  response,
		config: config,
	}
	_ = cItem.resetTTL()
	return cItem
}

func (ci *CacheItem) IsRefreshNeeded() bool {
	return ci.nextRefreshTime <= time.Now().UnixNano()
}

func (ci CacheItem) resetTTL() error {
	var maxTTL int64
	if ci.config.CacheItemTTL == 0 {
		maxTTL = DefaultCacheItemTTL
	} else {
		maxTTL = ci.config.CacheItemTTL
	}
	var ttl int64
	if maxTTL < 0 {
		return fmt.Errorf("cannot set negative ttl on cache")
	} else if maxTTL < 2 {
		ttl = maxTTL
	} else {
		ttl = rand.Int63n(maxTTL/2) + maxTTL/2
	}
	ci.nextRefreshTime = time.Now().Add(time.Nanosecond * time.Duration(ttl)).UnixNano()
	return nil
}

func (ci *CacheItem) Refresh(response any) error {
	err := ci.resetTTL()
	if err != nil {
		return err
	}
	ci.Value = response
	return nil
}
