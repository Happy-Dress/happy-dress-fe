import getCatalogueItem from './getCatalogItem';
import mockAxios from 'jest-mock-axios';
import { mockCatalogueItemResponse } from '../../../__mocks__/mockCatalogueItemResponse';

describe('getCatalogueItem', () => {
    it('should return expected values', async () => {
        mockAxios.get.mockResolvedValueOnce({ data: mockCatalogueItemResponse });
        const response = await getCatalogueItem(1, false);
        expect(response).toBeTruthy();
    });
});
