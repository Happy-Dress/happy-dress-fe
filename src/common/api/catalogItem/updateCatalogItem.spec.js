import { mockCatalogueItemResponse } from '../../../__mocks__/mockCatalogueItemResponse';
import { mockCatalogueItemUpdateProduct } from '../../../__mocks__/mockCatalogueItemUpdateProduct';
import updateCatalogItem from './updateCatalogItem';
import { vi } from 'vitest';
import axios from 'axios';

vi.mock('axios');

describe('updateCatalogueItem', () => {

    beforeEach(() => {
        vi.clearAllMocks();
    });
    
    it('should return expected values', async () => {
        const mockPut = vi.mocked(axios.put);
        mockPut.mockResolvedValueOnce({ data: mockCatalogueItemResponse });
        const response = await updateCatalogItem(mockCatalogueItemUpdateProduct);
        expect(response).toBeTruthy();
    });
});
