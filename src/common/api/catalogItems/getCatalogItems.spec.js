import getCatalogItems from './getCatalogItems';
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
        const response = await getCatalogItems(request, 1);
        expect(response).toBeTruthy();
    });
});
