import axios from 'axios';


const getCatalogueItem = async (id) => {
    const response = await axios.get(`products/${id}`);
    return response.data;
};

export default getCatalogueItem;
