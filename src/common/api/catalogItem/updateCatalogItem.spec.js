import mockAxios from 'jest-mock-axios';
import { mockCatalogueItemResponse } from '../../../__mocks__/mockCatalogueItemResponse';
import { mockCatalogueItemUpdateProduct } from '../../../__mocks__/mockCatalogueItemUpdateProduct';
import updateCatalogItem from './updateCatalogItem';

describe('updateCatalogueItem', () => {
    it('should return expected values', async () => {
        mockAxios.put.mockResolvedValueOnce({ data: mockCatalogueItemResponse });
        const response = await updateCatalogItem(mockCatalogueItemUpdateProduct);
        expect(response).toBeTruthy();
    });
});
