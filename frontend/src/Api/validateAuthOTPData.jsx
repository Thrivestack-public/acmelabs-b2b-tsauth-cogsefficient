import axios from 'axios';
import { validateAuthApiBase, validateAuthApiBaseEndpoint} from '../constants';

// Function to fetch data using Axios
async function validateAuthOTPData(otp) {
    const url = `${validateAuthApiBase}${validateAuthApiBaseEndpoint}?authOTP=${otp}`;
    try {
        const response = await axios.get(url);
        return response.data; // Return the data or process it as needed
    } catch (error) {
        return { error: error.message };
    }
}

export default validateAuthOTPData;
