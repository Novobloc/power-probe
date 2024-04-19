// utils/axiosConfig.js

import axios from 'axios';

// Create an instance of axios with default configuration
const Axios = axios.create({
  baseURL: 'http://localhost:8002', // Set your base URL here
});

// Optionally, you can add more configurations like headers, timeouts, etc.

// Add a request interceptor
Axios.interceptors.request.use(
  (config: any) => {
    // You can modify the request config here if needed
    return config;
  },
  (error: any) => {
    // Handle request errors
    return Promise.reject(error);
  },
);

// Add a response interceptor
Axios.interceptors.response.use(
  (response: any) => {
    // You can modify the response data here if needed
    return response;
  },
  (error: any) => {
    // Handle response errors
    return Promise.reject(error);
  },
);

export { Axios };