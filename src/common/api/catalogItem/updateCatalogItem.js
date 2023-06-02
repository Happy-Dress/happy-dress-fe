import axios from 'axios';

const updateCatalogueItem = async (product) => {
    const response = await axios.put(`products/update/${product.id}`, product);
    return response.data;
};

export default updateCatalogueItem;
