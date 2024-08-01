package lruCache

import (
	"sync"
)

type lruCache struct {
	cacheMap     map[string]*lruItem
	cacheMaxSize int
	cacheSize    int
	mux          sync.Mutex
	head         *lruItem
	tail         *lruItem
}
type lruItem struct {
	next *lruItem
	prev *lruItem
	key  string
	data interface{}
}

// newLRUCache initializes an lruCache instance with given max size.
func newLRUCache(maxSize int) *lruCache {
	return &lruCache{
		cacheMap:     make(map[string]*lruItem),
		cacheMaxSize: maxSize,
	}
}

// delete the cached item's data for the given key
func (l *lruCache) delete(key string) bool {
	l.mux.Lock()
	defer l.mux.Unlock()

	if _, ok := l.cacheMap[key]; !ok {
		return false
	}

	delete(l.cacheMap, key)
	return true
}

// get the cached item's data for the given key.
// Updates the fetched item to be head of nthe linked list
func (l *lruCache) get(key string) (interface{}, bool) {
	l.mux.Lock()
	defer l.mux.Unlock()

	item, exists := l.cacheMap[key]
	if !exists {
		return nil, false
	}

	l.updateHead(item)
	return item.data, true
}

// listKeys returns all the keys present in the cache
func (l *lruCache) listKeys() []string {
	l.mux.Lock()
	defer l.mux.Unlock()
	keys := []string{}
	for key := range l.cacheMap {
		keys = append(keys, key)
	}

	return keys
}

// flush removes all the items present in cache.
func (l *lruCache) flush() {
	l.mux.Lock()
	defer l.mux.Unlock()
	l.cacheMap = make(map[string]*lruItem)
}

// putIfAbsent puts an lruItem initialized from the given data in the cache.
// Updates head of the linked list to be new lruItem
func (l *lruCache) putIfAbsent(key string, data interface{}) bool {
	l.mux.Lock()
	defer l.mux.Unlock()

	_, found := l.cacheMap[key]
	// Check if the key already exists
	if found {
		return false
	}

	// Create a new item
	item := &lruItem{
		key:  key,
		data: data,
	}

	// Add the item to the cache map
	l.cacheMap[key] = item

	// Update the cache size
	l.cacheSize++

	// Update the head of the linked list
	l.updateHead(item)

	// If the cache size exceeds the maximum size, remove the tail item
	if l.cacheSize > l.cacheMaxSize {
		delete(l.cacheMap, (*l.tail).key)
		l.unLink(l.tail)
		l.cacheSize--
	}

	return true
}

// updateHead updates head of the linked list to be the input lruItem
func (l *lruCache) updateHead(item *lruItem) {
	// If the item is already the head, no need to update
	if l.head == item {
		return
	}

	// Remove the item from its current position
	l.unLink(item)

	// Set the item as the new head
	item.next = l.head

	// Update the head and its previous pointer
	if l.head != nil {
		l.head.prev = item
	}
	l.head = item

	// If the cache is empty, update the tail as well
	if l.tail == nil {
		l.tail = item
	}
}

// unLink removes the input lruItem from the linked list.
func (l *lruCache) unLink(item *lruItem) {
	// If the item is the head, update the head pointer
	if l.head == item {
		l.head = item.next
	}

	if l.tail == item {
		l.tail = item.prev
	}
	// Update the previous item's next pointer
	if item.prev != nil {
		item.prev.next = item.next
	}
	// Update the next item's previous pointer
	if item.next != nil {
		item.next.prev = item.prev
	}
}
