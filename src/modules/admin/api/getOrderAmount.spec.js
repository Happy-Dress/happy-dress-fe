
import getOrdersAmount from './getOrdersAmount';

describe('getOrdersAmount', () => {
    it('should return amount of orders', () => {
        getOrdersAmount().then(async (data) => {
            await expect(data).toBe(5);
        });
    });
});