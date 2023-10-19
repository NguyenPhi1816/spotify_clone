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
