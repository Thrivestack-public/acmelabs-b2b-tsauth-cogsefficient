import axios from 'axios';
import { sharedDataApiBase, sharedDataApiEndpoint, validateAuthApiBase, validateAuthApiBaseEndpoint } from '../constants';

import { MANAGEMENT_TOKEN_API_URL, ENRICHMENT_DATA_URL } from '../constants'
import { useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';

// Function to fetch data using Axios
async function fetchData(workflowRuntimeId, stepId) {
    const url = `${sharedDataApiBase}${sharedDataApiEndpoint}?workflowRuntimeId=${workflowRuntimeId}&stepId=${stepId}`;

    try {
        const response = await axios.get(url);
        return response.data; // Return the data or process it as needed
    } catch (error) {
        return { error: error.message };
    }
}

async function fetchValidateAuth(authOTP) {
    const url = `${validateAuthApiBase}${validateAuthApiBaseEndpoint}?authOTP=${authOTP}`;
    try {
        const response = await axios.get(url);
        return response.data; // Return the data or process it as needed
    } catch (error) {
        return { error: error.message };
    }
}


async function getManagementToken() {

    const apiUrl = MANAGEMENT_TOKEN_API_URL

    const jsonData = {
        product_id: "f01334c6-f726-11ee-bd2a-e60358d08e04",
        environment_id: "980b098a-f727-11ee-9452-c6b0e2ef0e53"
    }

    try {
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(jsonData)
        })

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`)
        }

        const result = await response.json();
        const token = result["api_trigger_token"];

        return token

        // if (token) {
        //     console.log("GETMANAGEMENTTOKEN",token)
        //     localStorage.setItem("TSManagementToken", token);
        // } else {
        //     console.error("Token not found");
        // }
    }

    catch (error) {
        return { error: error.message }
    }

}



async function getEnrichmentData() {
        
    const token = await getManagementToken()

    const apiUrl = ENRICHMENT_DATA_URL

    // const email = jwtDecode(token)

    const params = {
        productId: 'f01334c6-f726-11ee-bd2a-e60358d08e04',
        emailId: "aniketd@thrivestack.ai"
    }

    const url = new URL(apiUrl);
    Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));

    console.log("URL:-",url)

    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`)
        }

        
        localStorage.setItem("enrichmentData", response)

        return response


    } catch (error) {
        return { error: error.message };
    }
    

    // else{
    //     return (localStorage.getItem("enrichmentData"))
    // }

}

export { fetchData, fetchValidateAuth, getManagementToken, getEnrichmentData };