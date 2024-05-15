import axios from 'axios';

export const addOrder = async (order) => {
    return await axios.post('orders', order);
};