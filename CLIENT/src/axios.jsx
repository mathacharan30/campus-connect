import axios from 'axios';

// Create an Axios instance
const api = axios.create({
  baseURL: 'https://campus-connect-poix.vercel.app/', // Replace with your backend API URL
  withCredentials: true, // Include cookies in requests
});

export default api;
