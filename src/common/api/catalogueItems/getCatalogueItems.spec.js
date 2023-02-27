import getCatalogueItems from './getCatalogueItems';

describe('getCatalogueItems',  () => {
    it('should return expected values', async () => {

        const response = await getCatalogueItems('categories=4');
        expect(response).toBeTruthy();
    });
});
