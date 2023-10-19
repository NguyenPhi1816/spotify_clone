import api from './api';

export const getUserById = (id) =>
    api.get(`http://localhost:8080/api/v1/user/${id}`);

export const getFollowingPlaylist = (id) =>
    api.get(`http://localhost:8080/api/v1/user/${id}/playlists/followings`);

export const getAlbumsSongsByUserId = (id) =>
    api.get(`http://localhost:8080/api/v1/user/${id}/songs/albums`);
