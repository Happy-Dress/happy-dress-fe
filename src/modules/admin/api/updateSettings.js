import axios from 'axios';

const updateSettings = async (settings) => {
    const response = await axios.post('/settings', settings);

    return response.data;
};


export default updateSettings;
