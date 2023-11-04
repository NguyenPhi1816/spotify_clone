import api from './api';

export const getUserById = (id) => api.get(`/user/${id}`);

export const getFollowingPlaylist = (id) =>
    api.get(`/user/${id}/playlists/followings`);

export const getAlbumsSongsByUserId = (id) =>
    api.get(`/user/${id}/songs/albums`);

export const addFavoritePlaylist = (userId, playlistId) =>
    api.get(`/user/${userId}/add/${playlistId}`);

export const removeFavoritePlaylist = (userId, playlistId) =>
    api.get(`/user/${userId}/remove/${playlistId}`);

export const searchArtistByName = (artistName) =>
    api.get(`/user/find/artist/by/${artistName}`);
