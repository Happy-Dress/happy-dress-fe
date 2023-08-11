import axios from 'axios';

const updateCatalogItem = async (product) => {
    const response = await axios.put(`products/update/${product.id}`, product);
    return response.data;
};

export default updateCatalogItem;
