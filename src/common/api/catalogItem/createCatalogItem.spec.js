import createCatalogItem from './createCatalogItem';
import { mockCatalogueItemResponse } from '../../../__mocks__/mockCatalogueItemResponse';
import { vi } from 'vitest';
import axios from 'axios';

vi.mock('axios');


describe('createCatalogItem', () => {

    beforeEach(() => {
        vi.clearAllMocks();
    });
    
    it('should return expected values', async () => {
        const mockPost = vi.mocked(axios.post);
        mockPost.mockResolvedValueOnce({ data: mockCatalogueItemResponse });
        
        const data = await createCatalogItem(mockCatalogueItemResponse);
        expect(data).toStrictEqual(mockCatalogueItemResponse);
    });
});