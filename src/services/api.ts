import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

const api = axios.create({ baseURL: API_URL, headers: { 'Content-Type': 'application/json' } });

export const assessApp = async (data: any) => {
  const response = await api.post('/api/assess', data);
  return response.data;
};

export const getHealth = async () => {
  const response = await api.get('/api/health');
  return response.data;
};

export default api;
