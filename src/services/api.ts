import axios from 'axios';
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';
const api = axios.create({ baseURL: API_URL, headers: { 'Content-Type': 'application/json' } });
export const assessApp = async (data: any) => { const r = await api.post('/api/assess', data); return r.data; };
export const getHealth = async () => { const r = await api.get('/api/health'); return r.data; };
export default api;
