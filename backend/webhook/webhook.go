package webhook

import (
	"acmelabs-b2b-tsauth-cogsefficient-backend/cache"
	"acmelabs-b2b-tsauth-cogsefficient-backend/config"
	"acmelabs-b2b-tsauth-cogsefficient-backend/token"
	"bytes"
	"encoding/json"
	"fmt"
	"io"
	"io/ioutil"
	"log"
	"net/http"
	"os"
	"sync"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
)

type WebhookHandler struct {
	Config *config.Config
	Mu     sync.Mutex
}

type Event struct {
	EventType            string                `json:"eventType"`
	CreateAccountRequest *CreateAccountRequest `json:"createAccountRequest,omitempty"`
	JoinAccountRequest   *JoinAccountRequest   `json:"joinAccountRequest,omitempty"`
}

type CreateAccountRequest struct {
	WorkflowDesignTimeId string `json:"workflowDesignTimeId"`
	WorkflowRuntimeId    string `json:"workflowRuntimeId"`
	UserEmailId          string `json:"userEmailId"`
	PricingPlanId        string `json:"pricingPlanId"`
	AppRoleId            string `json:"appRoleId"`
	AccountName          string `json:"accountName"`
}

type JoinAccountRequest struct {
	WorkflowDesignTimeId string   `json:"workflowDesignTimeId"`
	WorkflowRuntimeId    string   `json:"workflowRuntimeId"`
	UserEmailId          string   `json:"userEmailId"`
	AccountIds           []string `json:"accountIds"`
}

func NewWebhookHandler() *WebhookHandler {
	return &WebhookHandler{}
}

// func (h *WebhookHandler) HandleWebhook(c *gin.Context) {
// 	body, err := io.ReadAll(r.Body)
// 	if err != nil {
// 		http.Error(w, "Unable to read request body", http.StatusInternalServerError)
// 		return
// 	}

// 	var event Event
// 	if err := json.Unmarshal(body, &event); err != nil {
// 		http.Error(w, "Invalid request body", http.StatusBadRequest)
// 		return
// 	}

// 	go h.processEvent(event)

// 	w.WriteHeader(http.StatusOK)
// 	fmt.Fprintln(w, "Event received")
// }

func (h *WebhookHandler) HandleWebhook(c *gin.Context) {
	body, err := io.ReadAll(c.Request.Body)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Unable to read request body"})
		return
	}

	var event Event
	if err := json.Unmarshal(body, &event); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid request body"})
		return
	}

	go h.processEvent(event)

	c.String(http.StatusOK, "Event received")
}

func (h *WebhookHandler) processEvent(event Event) {
	h.Mu.Lock()
	cache.Cache.Put(event.CreateAccountRequest.WorkflowRuntimeId, event)
	h.Mu.Unlock()

	time.Sleep(2 * time.Second) // Simulate async processing

	h.acknowledgeEvent(event)
}

func (h *WebhookHandler) acknowledgeEvent(event Event) {
	//url := "https://api.dev.app.thrivestack.ai/thrivestackWebhook/acknowledgeTenant" //h.Config.Endpoint.AcknowledgeTenant
	var url string
	if u, ok := os.LookupEnv("ACKNOWLEDGE_TENANT_URL"); ok {
		url = u
	}
	mgmtToken, err := token.GetThriveStackToken()
	if err != nil {
		fmt.Println("Error fetching ThriveStack token:", err)
		return
	}
	payload := map[string]interface{}{
		"eventType": event.EventType,
		"createAccountResponse": map[string]string{
			"workflowDesignTimeId": event.CreateAccountRequest.WorkflowDesignTimeId,
			"workflowRuntimeId":    event.CreateAccountRequest.WorkflowRuntimeId,
			"accountId":            uuid.NewString(),
			"accountName":          event.CreateAccountRequest.AccountName,
			"userEmailId":          event.CreateAccountRequest.UserEmailId,
		},
	}

	jsonPayload, err := json.Marshal(payload)
	if err != nil {
		log.Printf("Error marshalling payload: %v", err)
		return
	}

	req, err := http.NewRequest("POST", url, ioutil.NopCloser(bytes.NewReader(jsonPayload)))
	if err != nil {
		log.Printf("Error creating request: %v", err)
		return
	}

	req.Header.Set("Content-Type", "application/json")
	req.Header.Set("Authorization", fmt.Sprintf("Bearer %s", mgmtToken))

	client := &http.Client{}
	resp, err := client.Do(req)
	if err != nil {
		log.Printf("Error sending request: %v", err)
		return
	}
	defer resp.Body.Close()

	if resp.StatusCode != http.StatusOK {
		log.Printf("Received non-200 response: %d", resp.StatusCode)
	}
}
