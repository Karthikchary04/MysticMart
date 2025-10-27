import api from '../utils/api';

export const loginUser = (credentials) => {
    return api.post('/user/login', credentials);
};

export const registerUser = (userInfo) => {
    return api.post('/user/register',userInfo);
};