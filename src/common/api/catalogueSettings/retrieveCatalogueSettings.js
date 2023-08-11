import axios from 'axios';

const retrieveCatalogueSettings = async () => {
    const response = await axios.get('settings');

    return response.data;
};

export default retrieveCatalogueSettings;
