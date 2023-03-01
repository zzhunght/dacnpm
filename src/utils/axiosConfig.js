import axios from 'axios';
const headers = {};

const axiosInstance = axios.create({
  baseURL:
    'http://localhost:5000',
  headers,
});

axiosInstance.interceptors.request.use(
  async (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    console.log('error: ', error);
    return Promise.reject(error);
  },
);

axiosInstance.interceptors.response.use(
  async (response) => {
    return new Promise((resolve, reject) => {
      resolve(response);
    });
  },
  (error) => {
    console.log('error: ', error);
    if (!error.response) {
      return new Promise((resolve, reject) => {
        reject(error);
      });
    }

    if (error.response.status === 403) {
      // LOGOUT
    } else {
      return new Promise((resolve, reject) => {
        reject(error);
      });
    }
  },
);

export default axiosInstance;

