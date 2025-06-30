import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost/task_master/public/api',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

export default api;
