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

	acme_labs_pvt_key = "-----BEGIN RSA PRIVATE KEY-----\nMIIEowIBAAKCAQEAx7XIKjYjP61aMTfnMsbEk84+eJXpx3yUhBqWVS2K+xxYNBWD\nWMCsZcAJqvRx9uecS6UR3WfZhXfBH1+Z6RE4apx96YSL60Q1nCkewoUmHCYHQMnf\nThs3tbvASthzPq2LDXqzxVW8Aig5v0vxb+PwJGJahNVVZu3LFAPGLIFiwSudUc3P\nCyhsBFMyNRqgVa4upBSusNx/vmSLpDwCsnDf8L12xF75i3wFiAY61XyMksWi0sGu\naZKF+C0dAMZCRTfb2jibjuSnB55eg6N2Dl66YCylM7DrZyb1KaccI2qrMAFPGlGk\nzQYfJrjYGsKEfLCOWTlJaZurSzCP8SAvAb+PSQIDAQABAoIBAGZwz4Efjgsuz9Hp\nXBXGsbUjmRXfyDBEriXpQW3l06GlU3U8B8jx5Dy5OfxQMVk2SwzeWoCYsZJt8Ek4\nj8lmxOqi5U9wZxlCPsGgsh+Tjw3nT9ci9gGponT9HtEFoG/pMyex5h72MF9m5OBE\ng08iu97d+JKkn48RsRbOLMxNfiuZXDPj3xtLtJytJ5jpw/868djSjhHEEMq6zMJv\nLOVhZj9vcWUCGJVrWtEKA9lzFtKMV6PjMmkENI3Qe1AKG0sv9xvbhNB4ENrr4NeS\nafTXVzjZ3IouoDLHCp7TfsRlROxTCwqOWPrzW8FyqexliOzHPhekq5w9dV+5MPBX\nyRXjUgUCgYEA8fd6Aih+YG6pkSHtyLF2OrazE9FGMh8Qz0YeFUMua+IKS3DLijs0\n/By1XTulesX6rSLrmOZrriOJj2dtm7GoNzWxlrmRxeBIf1SP1jp2Kob7nni3JlZg\nVrYKmm2AZQoKjUNU1aA5ZGuZwr3Ob99vxOSvErlPGR7xVpG2pPX/ZvsCgYEA00rp\n42MUqJ9MME0MQfMa1O12RAzT9Y3gTQwEmryqcRDfYHJWatjfJ/fmudQuOyFhklRk\n7XZeZjJQKHz0IpxHTdx8mJ8Yy8M+TAZB3Bmfj+pc9oZgUhp9s0+FpiKJueUNXxyi\nFdtiEr+z29J9kBO4rIamkCUhgo9wLVoTe/m634sCgYEAnw3WneSQbkNQI57x96Lv\n3NiMDtLaGchh/F5TGBb5ROFpcv3KTittQOx+K7Mxq+rIRVdXF0MgNXAW1LVgT6AQ\nu3oIKtQBBtnPziOACYqUcpAYhqtDeWf+HAG+JpUkeUaIeSNxeJvCHki84k5yjQeL\nKRpKGzzEyfaVHhravMUYBlECgYAjUOAq+4KWdJm9cQNdeo6/jDk6QpKi9mXJOvsC\nCgrK/zD24+WB0mHqQks0QDzB8WBnnueHsUMx/bLcMZZ0un5Ii1PgBqeUVzvwZRNZ\nAIdk/J0xL2CmGHtuHxqNnDQ8+AX2IckNsi+ARr5/PX1zOXiijZcFfM9PDT6ItgeP\nrzwG5QKBgAal+olz8HGpVUqIptlzBvCzswGUpAzPusDRKisp3M0/Fl9INhsaG4ws\n6fR+Xd51CYUv50csnZtgS/39y/bned7vEKKEkIW7vnl+cpMDtGtf9hY7c2i/sfak\ni+KyvnMREUheZNGAGTxoHurnq26rj+n8kgybq8KVcQzAUQEb/449\n-----END RSA PRIVATE KEY-----\n" //Provide actual private key here
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
