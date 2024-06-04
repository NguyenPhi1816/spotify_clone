import api from './api';

export const getAlbumById = (id) => {
    return api.get(`/album/${id}`);
};

export const createAlbum = (accessToken, albumName) => {
    console.log(accessToken);
    return api.post(
        `album`,
        {
            name: albumName,
        },
        {
            headers: { Authorization: `Bearer ${accessToken}` },
        },
    );
};

export const addSongToAlbum = (albumId, songId) => {
    return api.get(`album/${albumId}/add/${songId}`);
};

export const removeSongFromAlbum = (albumId, songId) => {
    return api.get(`album/${albumId}/remove/${songId}`);
};

export const uploadAlbumImage = (albumId, file) => {
    const formData = new FormData();
    formData.append('image', file);
    return api.post(`album/upload/image/${albumId}`, formData);
};

export const changeAlbumName = (albumId, albumName) => {
    return api.put(`/album/update/${albumId}`, { name: albumName });
};
