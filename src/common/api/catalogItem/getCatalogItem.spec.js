import getCatalogueItem from './getCatalogItem';
import { mockCatalogueItemResponse } from '../../../__mocks__/mockCatalogueItemResponse';
import { vi } from 'vitest';
import axios from 'axios';

vi.mock('axios');

describe('getCatalogueItem', () => {

    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('should return expected values', async () => {
        const mockGet = vi.mocked(axios.get);
        mockGet.mockResolvedValueOnce({ data: mockCatalogueItemResponse });
        const response = await getCatalogueItem(1, false);
        expect(response).toBeTruthy();
    });
});
