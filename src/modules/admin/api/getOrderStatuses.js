import axios from 'axios';

export async function getOrderStatuses() {
    const response = await axios.get('/secure/orderStatuses');
    return response.data;
}