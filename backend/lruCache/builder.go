package lruCache

import "container/list"

const (
	DefaultMaxCacheSize = 256
	DefaultCacheItemTTL = 3600000000000 //1 hour in nanoseconds
)

type Fields interface {
	// WithCache [OPTIONAL] MaxCacheSize and TTL.
	// MaxCacheSize - The maximum number of cached secrets to maintain before evicting secrets that
	// have not been accessed recently.
	// TTL - The number of nanoseconds that a cached item is considered valid before requiring a refresh of the secret store.
	//Items that have exceeded this TTL will be refreshed synchronously when requesting the secret value. If the synchronous request is failed
	//then the stale secret will ne returned
	SetLimits(MaxCacheSize int, TTL int64) StoreBuilder
	//Build will return a secret store
	Build() (*Cache, error)
}

type StoreBuilder interface {
	//Fields exposes High level details to build your own SecretStore with options.
	Fields
}

type limitCfg struct {
	MaxCacheSize int
	TTL          int64
}

type storeBuilder struct {
	ll *list.List
}

func (s *storeBuilder) SetLimits(MaxCacheSize int, TTL int64) StoreBuilder {
	s.ll.PushBack(func(cfg *limitCfg) {
		cfg.MaxCacheSize = MaxCacheSize
		cfg.TTL = TTL
	})
	return s
}

func (sb *storeBuilder) Build() (*Cache, error) {
	cfg := new(limitCfg)
	cfg.Default()
	for e := sb.ll.Front(); e != nil; e = e.Next() {
		f := e.Value.(func(config *limitCfg))
		f(cfg)
	}
	if cfg.MaxCacheSize <= 0 {
		cfg.MaxCacheSize = DefaultMaxCacheSize
	}
	if cfg.TTL <= 0 {
		cfg.MaxCacheSize = DefaultCacheItemTTL
	}
	return newCacheClient(cfg)
}

func (cfg *limitCfg) Default() {
	cfg.MaxCacheSize = DefaultMaxCacheSize
	cfg.TTL = DefaultCacheItemTTL
}

func Builder() StoreBuilder {
	return &storeBuilder{
		ll: list.New(),
	}
}
