import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { sendOtpApi, verifyOtpApi } from '../../api/authApi';
import AsyncStorage from '@react-native-async-storage/async-storage';

// 🔹 Send OTP
export const sendOtp = createAsyncThunk(
  'auth/sendOtp',
  async (phone, { rejectWithValue }) => {
    try {
      const res = await sendOtpApi(phone);
      return res;
    } catch (error) {
      return rejectWithValue(error?.response?.data || error.message);
    }
  }
);

// 🔹 Verify OTP
export const verifyOtp = createAsyncThunk(
  'auth/verifyOtp',
  async ({ phone, otp }, { rejectWithValue }) => {
    try {
      const res = await verifyOtpApi(phone, otp);

      const data = res?.data || res;

      // 🔥 SAVE TOKEN HERE
      if (data?.token) {
        await AsyncStorage.setItem('token', data.token);
        console.log("TOKEN SAVED:", data.token);
      }

      return data; // ✅ return cleaned data
    } catch (error) {
      return rejectWithValue(error?.response?.data || error.message);
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    loading: false,
    error: null,
    otpSent: false,
    user: null,
  },

  reducers: {
    resetOtpState: state => {
      state.otpSent = false;
    },
    clearError: state => {
      state.error = null;
    },
    logout: state => {
      state.user = null;
    },
  },

  extraReducers: builder => {
    builder

      // SEND OTP
      .addCase(sendOtp.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(sendOtp.fulfilled, state => {
        state.loading = false;
        state.otpSent = true;
      })
      .addCase(sendOtp.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.payload?.message || action.payload || 'Something went wrong';
      })

      // VERIFY OTP
      .addCase(verifyOtp.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(verifyOtp.fulfilled, (state, action) => {
  state.loading = false;

  const data = action.payload?.data || action.payload;

  state.user = data;

  // 🔥 ADD HERE
  if (data?.token) {
    AsyncStorage.setItem('token', data.token);
    console.log("TOKEN SAVED:", data.token);
  }
})
      .addCase(verifyOtp.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.payload?.message || action.payload || 'Something went wrong';
      });
  },
});

export const { resetOtpState, clearError, logout } = authSlice.actions;

export default authSlice.reducer;