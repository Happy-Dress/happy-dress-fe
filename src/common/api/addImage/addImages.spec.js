import addImage from './addImage';
import mockAxios from 'jest-mock-axios';

const mockSettings = {};

describe('addCatalogImage', () => {

    afterEach(() => {
        mockAxios.reset();
    });

    it('should return expected values', async () => {
        const mockResponse = {
            data: mockSettings
        };
        mockAxios.post.mockResolvedValueOnce(mockResponse);
        const response = await addImage(mockSettings);

        expect(response).toBeTruthy();
    });
});
