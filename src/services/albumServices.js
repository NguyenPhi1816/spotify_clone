import api from './api';

export const getAlbumById = (id) => {
    return api.get(`http://localhost:8080/api/v1/album/${id}`);
};
