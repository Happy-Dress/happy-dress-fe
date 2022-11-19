import axios from 'axios';


const authenticateUser = async (credentials) => {
    const response = await axios.post('/auth/login', {
        login: credentials.login,
        password: credentials.password,
    });
    return response.data;
};


export default authenticateUser;