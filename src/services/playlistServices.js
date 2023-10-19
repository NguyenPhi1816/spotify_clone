import api from './api';

export const getPlaylistById = (id) => {
    return api.get(`/playlist/${id}`);
};
