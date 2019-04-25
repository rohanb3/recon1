import axios from 'axios';

const instance = axios.create({
  baseURL: '/api/disputs',
});

export default instance;
