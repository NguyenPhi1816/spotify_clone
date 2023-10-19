import api from './api';

export const getFollowingsByUserId = (id) => {
    return api.get(`/follower/${id}/followings`);
};
