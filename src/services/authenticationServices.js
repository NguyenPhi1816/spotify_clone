import api from './api';

export const authenticate = (email, password) =>
    api.post('/auth/authenticate', { email, password });

export const register = (data) => api.post('/auth/register', data);
