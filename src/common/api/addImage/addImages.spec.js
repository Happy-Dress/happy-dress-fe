import addImage from './addImage';
import { vi } from 'vitest';
import axios from 'axios';

vi.mock('axios');
const mockSettings = {};

describe('addCatalogImage', () => {

    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('should return expected values', async () => {
        const mockResponse = {
            data: mockSettings
        };
        const mockPost = vi.mocked(axios.post);
        mockPost.mockResolvedValueOnce(mockResponse);
        const response = await addImage(mockSettings);

        expect(response).toBeTruthy();
    });
});
