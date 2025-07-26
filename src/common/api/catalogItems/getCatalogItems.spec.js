import { vi } from 'vitest';
import getCatalogItems from './getCatalogItems';
import axios from 'axios';
import { mockCatalogueItemsResponse } from '../../../__mocks__/mockCatalogueItemsResponse';

vi.mock('axios');

describe('getCatalogueItems', () => {

    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('should return expected values', async () => {
        const mockAxios = vi.mocked(axios.post);
        const request = {
            category: 1,
            models: [],
            materials: [],
            colors: [],
            sizes: [],
        };
        mockAxios.mockResolvedValueOnce({ data: mockCatalogueItemsResponse });
        const response = await getCatalogItems(request, 1, false);
        expect(response).toBeTruthy();
    });
});
