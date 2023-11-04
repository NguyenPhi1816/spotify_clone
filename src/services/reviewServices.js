import api from './api';

export const uploadComment = (userId, songId, content) => {
    return api.post(`/review/${userId}/review/in/${songId}`, { content });
};
