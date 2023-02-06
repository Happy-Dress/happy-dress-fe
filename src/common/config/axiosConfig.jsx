import axios from 'axios';

axios.defaults.baseURL = process.env.REACT_APP_BASE_URL;

axios.interceptors.request.use(
    config => {
        config.headers['Authorization'] = `${localStorage.getItem('Authorization')}`;
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

axios.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response.status === 401){
            localStorage.removeItem('Authorization');
        }
        return Promise.reject(Array.isArray(error.response?.data?.message) ?
            error.response.data.message[0]
            : (error.response.data.message || error.message));
    })
;

const AxiosConfigProvider = ({ children }) => {
    return children;
};

export default AxiosConfigProvider;
