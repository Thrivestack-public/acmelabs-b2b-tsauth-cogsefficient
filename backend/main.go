package main

import (
	"acmelabs-b2b-tsauth-cogsefficient-backend/api"
	"acmelabs-b2b-tsauth-cogsefficient-backend/cache"
	"acmelabs-b2b-tsauth-cogsefficient-backend/webhook"
	"context"
	"log"
	"net/http"
	"os"

	"github.com/gin-gonic/gin"
)

var ctx = context.Background()

func main() {
	cache.InitCache()
	listenAddr := ""
	if val, ok := os.LookupEnv("FUNCTIONS_CUSTOMHANDLER_PORT"); ok {
		listenAddr = ":" + val
	}
	webhookHandler := webhook.NewWebhookHandler()
	router := gin.Default()
	router.GET("/api/sharedData", api.GetSharedValue)
	router.POST("/api/acmelabs-webhook", webhookHandler.HandleWebhook)
	// router.GET("api/simpleapi/about", about)

	router.Run(listenAddr)

	// http.HandleFunc("/api/sharedData", api.GetSharedValue)
	log.Printf("About to listen on %s. Go to https://127.0.0.1%s/", listenAddr, listenAddr)
	log.Fatal(http.ListenAndServe(listenAddr, nil))

	// cfgPath, err := config.ParseFlags()
	// if err != nil {
	// 	log.Fatal(err)
	// }
	// cfg, err := config.LoadConfig(ctx, cfgPath)
	// if err != nil {
	// 	log.Fatalf("Error loading config: %v", err)
	// }

	//http.HandleFunc("/", CustomHandler)

	// srv := server.NewServer(cfg)
	// server.RunServer(srv, cfg)
}
