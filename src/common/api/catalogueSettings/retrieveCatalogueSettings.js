import axios from 'axios';

const retrieveCatalogueSettings = async () => {
    const response = await axios.get('settings');
    // TODO: remove after BE adds orderNumber

    return {
        ...response.data,
        models: response.data.models.map((model, index) => ({ ...model, orderNumber: index })),
        materials: response.data.materials.map((material, index) => ({ ...material, orderNumber: index })),
        categories: response.data.categories.map((category, index) => ({ ...category, orderNumber: index })),
    };
};

export default retrieveCatalogueSettings;
