import api from './api';

export const getSongById = (id) => {
    return api.get(`/song/${id}`);
};

export const searchBySentiment = (sentiment) => {
    return api.get(`/song/find/by/sentiment/${sentiment}`);
};

export const addUserToSong = (songId, userId) => {
    return api.get(`/song/${songId}/add/${userId}`);
};

export const removeUserFromSong = (songId, userId) => {
    return api.get(`/song/${songId}/remove/${userId}`);
};

export const uploadSongImage = (songId, file) => {
    const formData = new FormData();
    formData.append('image', file);
    return api.post(`/song/upload/image/${songId}`, formData);
};

export const uploadSongAudio = (songId, file) => {
    const formData = new FormData();
    formData.append('audio', file);
    return api.post(`/song/upload/audio/${songId}`, formData);
};

export const uploadSong = (
    songId,
    name,
    genre,
    duration,
    lyric,
    day,
    month,
    year,
    label,
    usersId,
) => {
    const data = {
        name,
        genre,
        duration,
        lyric,
        day,
        month,
        year,
        label,
        usersId,
    };
    return api.put(`/song/update/${songId}`, data);
};

export const createSong = (
    name,
    genre,
    duration,
    lyric,
    day,
    month,
    year,
    label,
    usersId,
) => {
    const data = {
        name,
        genre,
        duration,
        lyric,
        day,
        month,
        year,
        label,
        usersId,
    };
    return api.post(`/song/save`, data);
};
