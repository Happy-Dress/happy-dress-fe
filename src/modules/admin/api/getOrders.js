import axios from 'axios';

export async function getOrders() {
    const response = await axios.get('/secure/orders');
    return response.data;
}