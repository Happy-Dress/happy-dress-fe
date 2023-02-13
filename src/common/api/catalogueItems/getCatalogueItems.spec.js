import getCatalogueItems from './getCatalogueItems';
import { mockCatalogueItemsResponse } from '../../../__mocks__/mockCatalogueItemsResponse';

describe('getCatalogueItems',  () => {
    it('should return expected values', async () => {

        const response = await getCatalogueItems('categories=4');
        expect(response).toEqual(mockCatalogueItemsResponse);
    });
});
