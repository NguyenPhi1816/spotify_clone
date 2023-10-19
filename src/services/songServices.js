import api from './api';

export const getSongById = (id) => {
    return api.get(`/song/${id}`);
};
