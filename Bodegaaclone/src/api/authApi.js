import Base_URL from "./BaseURL";
// Send OTP
export const sendOtpApi = async (mobile_number) => {
  try {
    const response = await Base_URL.post('auth/send-otp', {
      mobile_number,
    });
    return response.data;
  } catch (error) {
    throw error?.response?.data || error;
  }
};

// Verify OTP
export const verifyOtpApi = async (mobile_number, otp) => {
  try {
    const response = await Base_URL.post('auth/verify-otp', {
      mobile_number,
      otp,
    });
    return response.data;
  } catch (error) {
    throw error?.response?.data || error;
  }
};