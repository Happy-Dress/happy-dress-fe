import retrieveCatalogueSettings from './retrieveCatalogueSettings';
import mockAxios from 'jest-mock-axios';

describe('retrieveCatalogueSettings', () => {

    afterEach(() => {
        mockAxios.reset();
    });

    it('should retrieve settings', async () => {
        const mockSettings = {
            categories: [
                { id: 1, name: 'Свадебные' }
            ]
        };
        const mockResponse = {
            data: mockSettings
        };

        mockAxios.get.mockResolvedValueOnce(mockResponse);
        const retrievedSettings = await retrieveCatalogueSettings();
        expect(retrievedSettings).toEqual(mockSettings);
    });

});

