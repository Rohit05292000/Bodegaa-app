import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Base_URL = axios.create({
  baseURL: 'https://api.bodegaa.in/api/',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// ✅ ADD THIS BLOCK
Base_URL.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem('token');

    console.log("TOKEN IN INTERCEPTOR 👉", token); // 🔥 DEBUG

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

export default Base_URL;