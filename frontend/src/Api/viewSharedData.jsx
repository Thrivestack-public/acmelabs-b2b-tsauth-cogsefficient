import axios from 'axios';
import {sharedDataApiBase, sharedDataApiEndpoint, validateAuthApiBase, validateAuthApiBaseEndpoint} from '../constants';

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

async function fetchValidateAuth(authOTP){
    const url = `${validateAuthApiBase}${validateAuthApiBaseEndpoint}?authOTP=${authOTP}`;
    try {
        const response = await axios.get(url);
        return response.data; // Return the data or process it as needed
    } catch (error) {
        return { error: error.message };
    }
}
export  {fetchData, fetchValidateAuth};
