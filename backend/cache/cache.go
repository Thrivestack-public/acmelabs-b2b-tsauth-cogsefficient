package cache

import (
	"acmelabs-b2b-tsauth-cogsefficient-backend/lruCache"
	"log"
)

var Cache *lruCache.Cache

func InitCache() {
	var err error
	Cache, err = lruCache.Builder().SetLimits(1000, 360000).Build()
	if err != nil {
		log.Fatalf("Error initializing cache: %v", err)
	}
}
