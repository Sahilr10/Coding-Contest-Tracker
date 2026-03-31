import axios from 'axios';

// In development: use relative paths (Vite proxy handles routing)
// In production: use actual backend URL
if (import.meta.env.PROD) {
  axios.defaults.baseURL = 'https://coding-contest-tracker-backend.onrender.com';
}

axios.defaults.withCredentials = true;

export default axios;
