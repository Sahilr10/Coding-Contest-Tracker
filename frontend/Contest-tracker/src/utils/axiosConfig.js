import axios from 'axios';

// Setup axios for both development and production
export const getApiBaseURL = () => {
  // In development: use Vite proxy
  if (import.meta.env.DEV) {
    return '/api/v1';
  }
  
  // In production: use environment variable
  const apiUrl = import.meta.env.VITE_API_URL;
  if (apiUrl) {
    return apiUrl;
  }
  
  // Fallback: assume backend is on same domain
  return '/api/v1';
};

// Set default base URL
axios.defaults.baseURL = getApiBaseURL();
axios.defaults.withCredentials = true;

console.log('API Base URL:', axios.defaults.baseURL);

export default axios;
