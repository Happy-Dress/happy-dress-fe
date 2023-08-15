import getCatalogueItems from './getCatalogueItems';
import mockAxios from 'jest-mock-axios';
import { mockCatalogueItemsResponse } from '../../../__mocks__/mockCatalogueItemsResponse';

describe('getCatalogueItems', () => {
    it('should return expected values', async () => {

        const request = {
            category: 1,
            models: [],
            materials: [],
            colors: [],
            sizes: [],
        };
        mockAxios.post.mockResolvedValueOnce({ data: mockCatalogueItemsResponse });
        const response = await getCatalogueItems(request, 1, false);
        expect(response).toBeTruthy();
    });
});
