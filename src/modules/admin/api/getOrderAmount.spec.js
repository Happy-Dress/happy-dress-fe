import getOrdersAmount from './getOrdersAmount';

describe('should return number 5', ()=>{
    it(' 5', ()=>{
        getOrdersAmount().then(async data => {
            await  expect(data).toBe(5);
        });
    });
});