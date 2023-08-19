import axios from 'axios';


const authenticateUser = async (credentials) => {
    const response = await axios.post('/auth/login', {
        login: credentials.login,
        password: credentials.password,
    });
    return {
        accessToken: response.data.accessToken,
        refreshToken: response.data.refreshToken
    };
};


export default authenticateUser;