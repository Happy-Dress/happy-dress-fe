import axios from 'axios';

const createCatalogItem = async (product) => {
    const response = await axios.post('/secure/products/create', product);
    return response.data;
};

export default createCatalogItem;