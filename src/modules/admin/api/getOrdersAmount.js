import axios from 'axios';

async function getOrdersAmount() {
    const response = await axios.get('/secure/orders');
    return response.data?.length || 0;
}

export default getOrdersAmount;