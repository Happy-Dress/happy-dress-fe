import getSettings  from './getSettings';

describe('getSettings',  () => {
    it('should return a list of categories',  () => {
        getSettings().then(async (data)=>
            expect(data).toBe(getSettings()));
    });
});

