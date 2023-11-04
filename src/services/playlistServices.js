import api from './api';

export const getPlaylistById = (id) => {
    return api.get(`/playlist/${id}`);
};

export const addSongToFavPlaylist = (userId, songId) => {
    return api.get(`/playlist/user/${userId}/add/${songId}`);
};

export const removeSongFromFavPlaylist = (userId, songId) => {
    return api.get(`/playlist/user/${userId}/remove/${songId}`);
};
