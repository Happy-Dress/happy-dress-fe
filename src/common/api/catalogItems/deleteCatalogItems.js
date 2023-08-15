import axios from 'axios';

export const deleteCatalogItems = async (productId) => {
    await axios.delete(`products/${productId}`);
};

