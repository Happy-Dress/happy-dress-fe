import { instance } from './instance';

export const URL = {
    login: () => 'auth/login',
};

export const authLogin = ({ login, password }) => {
    return instance.post(URL.login(), {
        login,
        password,
    });
};
