package api

import (
	"acmelabs-b2b-tsauth-cogsefficient-backend/cache"
	"acmelabs-b2b-tsauth-cogsefficient-backend/webhook"
	"net/http"

	"github.com/gin-gonic/gin"
)

func GetSharedValue(c *gin.Context) {

	stepId := c.Request.URL.Query().Get("stepId")
	workflowRuntimeId := c.Request.URL.Query().Get("workflowRuntimeId")
	cacheItem := cache.Cache.Get(workflowRuntimeId)
	if cacheItem == nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Value not found"})
		return
	}

	event, ok := cacheItem.Value.(webhook.Event)
	if !ok {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Invalid event type"})
		return
	}

	response := gin.H{}

	if stepId == "tenant_creation" {
		switch event.EventType {
		case "account_created":
			response = gin.H{
				"eventType": event.EventType,
				"createAccountRequest": gin.H{
					"workflowDesignTimeId": event.CreateAccountRequest.WorkflowDesignTimeId,
					"workflowRuntimeId":    event.CreateAccountRequest.WorkflowRuntimeId,
					"userEmailId":          event.CreateAccountRequest.UserEmailId,
					"pricingPlanId":        event.CreateAccountRequest.PricingPlanId,
					"appRoleId":            event.CreateAccountRequest.AppRoleId,
					"accountName":          event.CreateAccountRequest.AccountName,
				},
			}
		case "account_added_user":
			response = gin.H{
				"eventType": event.EventType,
				"joinAccountRequest": gin.H{
					"workflowDesignTimeId": event.JoinAccountRequest.WorkflowDesignTimeId,
					"workflowRuntimeId":    event.JoinAccountRequest.WorkflowRuntimeId,
					"userEmailId":          event.JoinAccountRequest.UserEmailId,
					"accountIds":           event.JoinAccountRequest.AccountIds,
				},
			}
		}
	}
	// if stepId != "" {
	// 	if stepId == "onboarding" {
	// 		response = map[string]interface{}{
	// 			"eventType":         "onboarding_completed",
	// 			"workflowRuntimeId": "e0439307-a74d-4f4d-92d0-99f7ad9eece4",
	// 			"returnUrl":         "https://ts.dev.app.thrivestack.ai/bb1660a7-7a75-4ba1-ac6e-c91188ff1eb9/0ecaa75e-9fe4-4b92-8ece-a7ddb03c52b0/c6cb6275-b125-11ee-a55d-b68372f54d22/home?productId=bb1660a7-7a75-4ba1-ac6e-c91188ff1eb9&environmentId=0ecaa75e-9fe4-4b92-8ece-a7ddb03c52b0&environment=dev&runtimeId=d216e395-3f55-11ef-8d68-6675956309c3&workflowId=c6cb6275-b125-11ee-a55d-b68372f54d22&userEmail=prasahants@yopmail.com",
	// 		}
	// 	}
	// 	if stepId == "tenant_acknowledgement" {
	// 		response = map[string]interface{}{
	// 			"eventType":            "tenant_ack_request",
	// 			"workflowDesignTimeId": "6b1082a4-428d-11ef-af81-9ad0734e3187",
	// 			"workflowRuntimeId":    "e0439307-a74d-4f4d-92d0-99f7ad9eece4",
	// 			"accountIds":           "",
	// 			"userEmailId":          "john.doe@saasbox.online",
	// 			"isTest":               true,
	// 		}
	// 	}

	// 	if stepId == "tenant_creation" {
	// 		response = map[string]interface{}{
	// 			"eventType": "tenant_creation",
	// 			"createAccountRequest": map[string]interface{}{
	// 				"workflowDesignTimeId": "334626a5-9826-45b8-b39d-20ca7e818939",
	// 				"workflowRuntimeId":    "e0439307-a74d-4f4d-92d0-99f7ad9eece4",
	// 				"userEmailId":          "user@example.com",
	// 				"pricingPlanId":        "55429ed9-b655-4488-b735-d2c18ee3bf28",
	// 				"appRoleId":            "fe131f64-960e-402f-b43b-f1ec048aafdc",
	// 				"accountName":          "Acme",
	// 			},
	// 		}
	// 	}
	// 	if stepId == "product_redirect" {
	// 		response = map[string]interface{}{
	// 			"eventType":         "product_redirect",
	// 			"workflowRuntimeId": "e0439307-a74d-4f4d-92d0-99f7ad9eece4",
	// 			"returnUrl":         "https://app.acme-labs.com",
	// 		}
	// 	}

	// }
	// Construct the response data
	// response = map[string]interface{}{
	// 	"eventType": "account_created",
	// 	"createAccountRequest": map[string]interface{}{
	// 		"workflowDesignTimeId": "334626a5-9826-45b8-b39d-20ca7e818939",
	// 		"workflowRuntimeId":    "e0439307-a74d-4f4d-92d0-99f7ad9eece4",
	// 		"userEmailId":          "user@example.com",
	// 		"pricingPlanId":        "55429ed9-b655-4488-b735-d2c18ee3bf28",
	// 		"appRoleId":            "fe131f64-960e-402f-b43b-f1ec048aafdc",
	// 		"accountName":          "Acme",
	// 	},
	// }
	// } else {
	// response = map[string]interface{}{
	// 	"eventType":         "product_redirect",
	// 	"workflowRuntimeId": "e0439307-a74d-4f4d-92d0-99f7ad9eece4",
	// 	"returnUrl":         "https://app.acme-labs.com",
	// }
	// //}
	// // Set the response header to indicate JSON content
	// w.Header().Set("Content-Type", "application/json")

	// // Encode the response map as JSON and write it to the response writer
	// err := json.NewEncoder(w).Encode(response)
	// if err != nil {
	// 	http.Error(w, "Error encoding JSON response", http.StatusInternalServerError)
	// 	return
	// }
	// response = gin.H{
	// 	"eventType":         "product_redirect",
	// 	"workflowRuntimeId": "e0439307-a74d-4f4d-92d0-99f7ad9eece4",
	// 	"returnUrl":         "https://app.acme-labs.com",
	// }

	// Set the response header to indicate JSON content
	c.Header("Content-Type", "application/json")
	c.JSON(http.StatusOK, response)
}
