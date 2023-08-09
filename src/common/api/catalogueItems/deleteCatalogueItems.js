import axios from 'axios';

export const deleteCatalogueItems = async (productId) => {
    await axios.delete(`products/${productId}`);
};

