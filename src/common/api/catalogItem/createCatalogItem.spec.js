import mockAxios from 'jest-mock-axios';
import createCatalogItem from './createCatalogItem';
import { mockCatalogueItemResponse } from '../../../__mocks__/mockCatalogueItemResponse';

describe('createCatalogItem', () => {
    it('should return expected values', async () => {
        mockAxios.post.mockResolvedValueOnce({ data: mockCatalogueItemResponse });
        const data = await createCatalogItem(mockCatalogueItemResponse);
        expect(data).toStrictEqual(mockCatalogueItemResponse);
    });
});