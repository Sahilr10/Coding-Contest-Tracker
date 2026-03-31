import axios from 'axios';

// Setup axios for both development and production
export const getApiBaseURL = () => {
  // In development: use Vite proxy
  if (import.meta.env.DEV) {
    return '/api/v1';
  }
  
  // In production: try multiple sources for API URL
  // 1. Check Vite environment variable
  let apiUrl = import.meta.env.VITE_API_URL;
  if (apiUrl) {
    return apiUrl;
  }
  
  // 2. Check window variable set by deployment
  if (window.__VITE_API_URL__) {
    return window.__VITE_API_URL__;
  }
  
  // 3. Default to backend domain (most reliable)
  return 'https://coding-contest-tracker-backend.onrender.com/api/v1';
};

// Set default base URL
axios.defaults.baseURL = getApiBaseURL();
axios.defaults.withCredentials = true;

console.log('API Base URL:', axios.defaults.baseURL);

export default axios;
