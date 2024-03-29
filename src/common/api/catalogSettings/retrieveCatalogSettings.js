import axios from 'axios';

const retrieveCatalogSettings = async (isSecure) => {
    const response = await axios.get(isSecure ? 'secure/settings' : 'settings');

    return response.data;
};

export default retrieveCatalogSettings;
