import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:3000',  // Adjust with your Rails backend URL
  withCredentials: true,  // Ensure credentials are included in CORS requests
});

// Manually retrieve CSRF token
const csrfTokenMetaTag = document.querySelector('meta[name=csrf-token]');
if (csrfTokenMetaTag) {
  axiosInstance.defaults.headers.common['X-CSRF-Token'] = csrfTokenMetaTag.content;
} else {
  console.error('CSRF token meta tag not found! Make sure it is present in your HTML.');
}

export default axiosInstance;
