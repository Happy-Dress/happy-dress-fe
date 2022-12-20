import getDataCards  from './getDataCards';

describe('getDataCards',  () => {
    it('should return a list of categories',  () => {
        getDataCards().then(async (data)=>
            expect(data).toBe(getDataCards()));
    });
});

