package server

import (
	"context"
	"log"
	"net/http"
	"os"
	"os/signal"
	"syscall"
	"time"

	"acmelabs-b2b-tsauth-cogsefficient-backend/config"
)

func NewServer(cfg *config.Config) *http.Server {
	//webhookHandler := webhook.NewWebhookHandler(cfg)

	mux := http.NewServeMux()
	//mux.HandleFunc("/api/acmelabs-webhook", webhookHandler.HandleWebhook)
	//mux.HandleFunc("/api/sharedData", api.GetSharedValue)

	server := &http.Server{
		Addr:         cfg.Server.Host + ":" + cfg.Server.Port,
		Handler:      mux,
		ReadTimeout:  cfg.Server.Timeout.Read * time.Second,
		WriteTimeout: cfg.Server.Timeout.Write * time.Second,
		IdleTimeout:  cfg.Server.Timeout.Idle * time.Second,
	}

	return server
}

func RunServer(server *http.Server, cfg *config.Config) {
	go func() {
		if err := server.ListenAndServe(); err != nil && err != http.ErrServerClosed {
			log.Fatalf("Could not listen on %s:%s: %v\n", cfg.Server.Host, cfg.Server.Port, err)
		}
	}()

	quit := make(chan os.Signal, 1)
	signal.Notify(quit, os.Interrupt, syscall.SIGTERM)
	<-quit

	ctx, cancel := context.WithTimeout(context.Background(), cfg.Server.Timeout.Server)
	defer cancel()

	if err := server.Shutdown(ctx); err != nil {
		log.Fatalf("Server forced to shutdown: %v", err)
	}
}
