import axios from 'axios';

const updateSettings = async (settings) => {
    const response = await axios.post('/settings', settings);
    // TODO: remove after BE adds orderNumber
    return {
        ...response.data,
        models: response.data.models.map((model, index) => ({ ...model, orderNumber: index })),
        materials: response.data.materials.map((material, index) => ({ ...material, orderNumber: index })),
        categories: response.data.categories.map((category, index) => ({ ...category, orderNumber: index })),
        colors: response.data.colors.map((color, index) => ({ ...color, orderNumber: index })),
    };
};


export default updateSettings;
