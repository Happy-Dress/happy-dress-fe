import axios from 'axios';

const updateCatalogueItem = async (data) => {
    const response = await axios.put(`products/update/${data.id}`, data);
    return response.data;
};

export default updateCatalogueItem;
