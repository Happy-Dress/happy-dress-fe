import axios from 'axios';

const createCatalogItem = async (product) => {
    const response = await axios.post('products/create', product);
    return response.data;
};

export default createCatalogItem;