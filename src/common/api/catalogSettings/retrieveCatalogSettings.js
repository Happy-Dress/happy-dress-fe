import axios from 'axios';

const retrieveCatalogSettings = async () => {
    const response = await axios.get('settings');

    return response.data;
};

export default retrieveCatalogSettings;
