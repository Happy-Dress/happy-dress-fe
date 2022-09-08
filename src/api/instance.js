import axios from 'axios';

export const instance = axios.create({
    baseURL: 'https://happy-dress-server.herokuapp.com/api/v1/',
});

instance.interceptors.request.use(async (request) => {
    request.headers = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${sessionStorage.getItem('accessToken')}`,
    };

    return request;
});