package token

import (
	"bytes"
	"encoding/json"
	"fmt"
	"io"
	"net/http"
	"os"
)

type TokenRequest struct {
	KeyID      string   `json:"key_id"`
	PrivateKey string   `json:"private_key"`
	Scopes     []string `json:"scopes"`
	Expiry     int      `json:"expiry"`
}

type TokenResponse struct {
	Token string `json:"token"`
}

func GetThriveStackToken() (string, error) {
	var token_URL, acme_labs_pvt_key_id, acme_labs_pvt_key string

	if tURL, ok := os.LookupEnv("TS_TOKEN_URL"); ok {
		token_URL = tURL
	}

	if kId, ok := os.LookupEnv("ACME_LABS_PRIVATE_KEY_ID"); ok {
		acme_labs_pvt_key_id = kId
	}
	//url := "https://api.dev.app.thrivestack.ai/api/token"
	acme_labs_pvt_key = "" //Provide actual private key here
	requestBody, err := json.Marshal(TokenRequest{
		KeyID:      acme_labs_pvt_key_id,
		PrivateKey: acme_labs_pvt_key,
		Scopes:     []string{"telemetry_apis", "workflow_trigger_api"},
		Expiry:     1439,
	})
	if err != nil {
		return "", fmt.Errorf("failed to marshal request body: %v", err)
	}

	req, err := http.NewRequest("POST", token_URL, bytes.NewBuffer(requestBody))
	if err != nil {
		return "", fmt.Errorf("failed to create request: %v", err)
	}
	req.Header.Set("Content-Type", "application/json")

	client := &http.Client{}
	resp, err := client.Do(req)
	if err != nil {
		return "", fmt.Errorf("failed to send request: %v", err)
	}
	defer resp.Body.Close()

	body, err := io.ReadAll(resp.Body)
	if err != nil {
		return "", fmt.Errorf("failed to read response body: %v", err)
	}

	if resp.StatusCode != http.StatusOK {
		return "", fmt.Errorf("failed to fetch ThriveStack token: %s", body)
	}

	var tokenResponse TokenResponse
	if err := json.Unmarshal(body, &tokenResponse); err != nil {
		return "", fmt.Errorf("failed to unmarshal response body: %v", err)
	}

	return tokenResponse.Token, nil
}
