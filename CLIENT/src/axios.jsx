import axios from 'axios';

// Create an Axios instance
const api = axios.create({
  baseURL: 'http://localhost:8080/', // Replace with your backend API URL
  withCredentials: true, // Include cookies in requests
});

export default api;
