
import getOrdersAmount from './getOrdersAmount';

describe('getOrdersAmount', () => {
    it('should retrive amount of orders', () => {
        getOrdersAmount().then(async (data) => {
            await expect(data).toBe(5);
        });
    });
});
