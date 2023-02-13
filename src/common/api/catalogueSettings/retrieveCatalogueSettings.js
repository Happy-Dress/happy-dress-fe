import axios from 'axios';

const retrieveCatalogueSettings = async () => {
    const response = await axios.get('settings');
    // TODO: remove after BE adds orderNumber
    if(!response) return {};

    return { ...response.data, models: response.data.models.map((model, index) => ({ ...model, orderNumber: index })) };
};

export default retrieveCatalogueSettings;
