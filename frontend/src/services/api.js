import axios from 'axios';

const api = axios.create({
  baseUrl: 'http://localhost:4200'
})

export default api;
