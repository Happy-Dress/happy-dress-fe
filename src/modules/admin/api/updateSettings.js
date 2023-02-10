import axios from 'axios';

const updateSettings = async (settings) => {
    const response = await axios.post('/settings', settings);
    // TODO: remove after BE adds orderNumber
    return {
        ...response.data,
        models: response.data.models.map((model, index) => ({ ...model, orderNumber: index })),
        materials: response.data.materials.map((material, index) => ({ ...material, orderNumber: index }))
    };
};


export default updateSettings;
