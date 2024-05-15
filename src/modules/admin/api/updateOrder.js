import axios from 'axios';

export async function updateOrder(id, order) {
    await axios.put(`secure/orders/${id}`, {
        ...order,
    });
}