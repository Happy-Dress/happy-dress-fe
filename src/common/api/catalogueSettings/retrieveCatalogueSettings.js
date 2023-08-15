import axios from 'axios';

const retrieveCatalogueSettings = async (isSecure) => {
    const response = await axios.get(isSecure ? 'secure/settings' : 'settings');

    return response.data;
};

export default retrieveCatalogueSettings;
