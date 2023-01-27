import axios from 'axios';

axios.defaults.baseURL = process.env.REACT_APP_BASE_URL;

axios.interceptors.response.use(
    (response) => response,
    (error) =>
        Promise.reject(Array.isArray(error.response?.data?.message) ?
            error.response.data.message[0]
            : (error.response.data.message || error.message)),
);

const AxiosConfigProvider = ({ children }) => {
    return children;
};

export default AxiosConfigProvider;