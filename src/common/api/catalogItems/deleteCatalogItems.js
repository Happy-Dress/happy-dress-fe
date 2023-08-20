import axios from 'axios';

export const deleteCatalogItems = async (selectedProducts) => {
    await axios.delete('secure/products', { data: selectedProducts });
};

