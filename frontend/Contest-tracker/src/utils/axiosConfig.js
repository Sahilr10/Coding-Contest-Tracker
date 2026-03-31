import axios from 'axios';

// Simple axios setup - works with Vite proxy in dev, relative paths in production
axios.defaults.withCredentials = true;

export default axios;
