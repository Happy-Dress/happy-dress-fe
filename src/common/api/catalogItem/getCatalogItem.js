import axios from 'axios';


const getCatalogueItem = async (id, isSecure) => {
    const response = await axios.get(isSecure ? `secure/products/${id}` :`products/${id}`);
    return response.data;
};

export default getCatalogueItem;
