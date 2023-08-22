import axios from 'axios';

axios.defaults.baseURL = process.env.REACT_APP_BASE_URL;
const loginUrl = '/auth/login';


axios.interceptors.request.use(
    config => {
        config.url !== loginUrl && (config.headers['Authorization'] = `${localStorage.getItem('Authorization')}`);
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

axios.interceptors.response.use(
    (response) => response,
    async (error) => {
        return Promise.reject(Array.isArray(error.response?.data?.message) ?
            error.response.data.message[0]
            : (error.response.data.message || error?.response?.data?.error|| error.message));
    }
);

const AxiosConfigProvider = ({ children }) => {
    return children;
};

export default AxiosConfigProvider;
