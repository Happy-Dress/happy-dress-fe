import axios from 'axios';


axios.defaults.baseURL = process.env.REACT_APP_BASE_URL;

const AxiosConfigProvider = ({ children }) => {
    return children;
};

export default AxiosConfigProvider;