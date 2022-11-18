import axios from 'axios';
import { AUTHORIZATION_FORM_DICTIONARY } from '../components/AuthorizationForm/AuthorizationForm.dictionary';

const {
    POST_PATH,
    WRONG_LOGIN,
    WRONG_PASSWORD,
} = AUTHORIZATION_FORM_DICTIONARY;

const authenticateUser = (setError) => {
    return async (data) => {
        axios.post(POST_PATH, {
            login: data.login,
            password: data.password,
        }).then((result) => localStorage.setItem('Authorization', `Bearer ${result.data.accessToken}`))
            .catch(() => {
                setError('login', {
                    message: WRONG_LOGIN,
                });
                setError('password', {
                    message: WRONG_PASSWORD,
                });
            });
    };
};

export default authenticateUser;