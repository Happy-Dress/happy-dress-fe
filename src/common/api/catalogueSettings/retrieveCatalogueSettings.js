import axios from 'axios';

const retrieveCatalogueSettings = async () => {
    const response = await axios.get('settings');
    // TODO: remove after BE adds orderNumber
    return {
        ...response.data,
        models: response.data.models.map((model, index) => ({ ...model, orderNumber: index })),
        materials: response.data.materials.map((material, index) => ({ ...material, orderNumber: index })),
        colors: response.data.colors.map((color, index) => ({ ...color, orderNumber: index })),
    };
};

export default retrieveCatalogueSettings;
