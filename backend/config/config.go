package config

import (
	"context"
	"flag"
	"fmt"
	"os"
	"time"

	"gopkg.in/yaml.v2"
)

// Config struct for webapp config
type Config struct {
	Server struct {
		Host    string `yaml:"host"`
		Port    string `yaml:"port"`
		Timeout struct {
			Server time.Duration `yaml:"server"`
			Write  time.Duration `yaml:"write"`
			Read   time.Duration `yaml:"read"`
			Idle   time.Duration `yaml:"idle"`
		} `yaml:"timeout"`
	} `yaml:"server"`
	Endpoint struct {
		AcknowledgeTenant string `yaml:"acknowledgeTenant"`
	} `yaml:"endpoint"`
	LRU struct {
		MaxCacheSize int   `yaml:"maxCacheSize"`
		TTLInMS      int64 `yaml:"ttlMs"`
	} `yaml:"lru"`
}

func LoadConfig(context context.Context, configPath string) (*Config, error) {
	file, err := os.Open(configPath)
	if err != nil {
		return nil, err
	}
	defer file.Close()

	var cfg Config
	decoder := yaml.NewDecoder(file)
	if err := decoder.Decode(&cfg); err != nil {
		return nil, err
	}

	return &cfg, nil
}

// ValidateConfigPath just makes sure, that the path provided is a file,
// that can be read
func ValidateConfigPath(path string) error {
	s, err := os.Stat(path)
	if err != nil {
		return err
	}
	if s.IsDir() {
		return fmt.Errorf("'%s' is a directory, not a normal file", path)
	}
	return nil
}

// ParseFlags will create and parse the CLI flags
// and return the path to be used elsewhere
func ParseFlags() (string, error) {
	var configPath string
	flag.StringVar(&configPath, "config", "./config/config.yml", "path to config file")
	flag.Parse()

	if err := ValidateConfigPath(configPath); err != nil {
		return "", err
	}

	return configPath, nil
}

// Run will run the HTTP Server
// func (cfg *Config) Run() {
// 	var runChan = make(chan os.Signal, 1)
// 	ctx, cancel := context.WithTimeout(context.Background(), cfg.Server.Timeout.Server)
// 	defer cancel()

// 	server := &http.Server{
// 		Addr:         cfg.Server.Host + ":" + cfg.Server.Port,
// 		Handler:      NewRouter(cfg),
// 		ReadTimeout:  cfg.Server.Timeout.Read * time.Second,
// 		WriteTimeout: cfg.Server.Timeout.Write * time.Second,
// 		IdleTimeout:  cfg.Server.Timeout.Idle * time.Second,
// 	}

// 	signal.Notify(runChan, os.Interrupt, syscall.SIGTSTP)
// 	log.Printf("Server is starting on %s\n", server.Addr)

// 	go func() {
// 		if err := server.ListenAndServe(); err != nil && err != http.ErrServerClosed {
// 			log.Fatalf("Server failed to start due to err: %v", err)
// 		}
// 	}()

// 	interrupt := <-runChan
// 	log.Printf("Server is shutting down due to %+v\n", interrupt)
// 	if err := server.Shutdown(ctx); err != nil {
// 		log.Fatalf("Server was unable to gracefully shutdown due to err: %+v", err)
// 	}
// }
