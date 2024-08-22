import axios from 'axios';
import { thriveStackApiBase} from '../constants';

// Function to fetch data using Axios
async function validateAuthOTPData(otp) {
    const url = `${thriveStackApiBase}?authOTP=${otp}`;
    try {
        const response = await axios.get(url);
        return response.data; // Return the data or process it as needed
    } catch (error) {
        return { error: error.message };
    }
}

export default validateAuthOTPData;
