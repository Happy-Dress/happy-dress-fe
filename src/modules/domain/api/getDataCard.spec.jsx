import getDataCards  from './getDataCards';

describe('getDataCards',  () => {
    it('should return amount of orders',  () => {
        getDataCards().then(async (data)=>
            expect(data).toBe(10));
    });
});

