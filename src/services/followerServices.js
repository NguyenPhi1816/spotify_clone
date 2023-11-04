import api from './api';

export const getFavArtist = (userId) =>
    api.get(`/follower/${userId}/followings`);

export const addFavArtist = (userId, artistId) =>
    api.get(`/follower/${userId}/follow/${artistId}`);

export const removeFavArtist = (userId, artistId) =>
    api.delete(`/follower/${userId}/cancel/${artistId}`);
