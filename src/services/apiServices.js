import axios from 'axios';

const api = axios.create({ baseURL: import.meta.env.VITE_API_URL });

export const getCategoryChildById = (id) => {
    return api.get(`/category/getChildBy/${id}`);
};

export const getHomeCategory = () => {
    return api.get(`/category/getCategoryHome`);
};

export const getAllCategories = () => {
    return api.get('/category/getAllParent');
};

export const getPlaylistById = (id) => {
    return api.get(`/playlist/${id}`);
};

export const getSongById = (id) => {
    return api.get(`/song/${id}`);
};
