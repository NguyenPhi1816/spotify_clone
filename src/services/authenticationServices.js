import api from './api';

export const authenticate = (email, password) => {
    return api.post('/auth/authenticate', { email, password });
};
