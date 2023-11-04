import api from './api';

export const getCategoryChildById = (id) => {
    return api.get(`/category/getChildBy/${id}`);
};

export const getHomeCategory = () => {
    return api.get(`/category/getCategoryHome`);
};

export const getAllCategories = () => {
    return api.get('/category/getAllParent');
};

export const getCategoriesById = (id) => {
    return api.get(`/category/${id}`);
};

export const searchByKeyword = (keyword) => {
    return api.get(`/category/search/${keyword}`);
};
