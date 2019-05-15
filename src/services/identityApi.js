import axios from 'axios';

const instance = axios.create({
  baseURL: '/api/identity/api/',
});

export default instance;
