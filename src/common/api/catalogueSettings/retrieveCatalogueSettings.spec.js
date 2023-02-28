import retrieveCatalogueSettings from './retrieveCatalogueSettings';
import mockAxios from 'jest-mock-axios';

describe('retrieveCatalogueSettings', () => {

    afterEach(() => {
        mockAxios.reset();
    });

    it('should retrieve settings', async () => {
        const mockSettings = {
            models: [
                { id: 1, name: 'Пышные' }
            ],
            materials: [
                { id: 1, name: 'Органза' }
            ],
            colors: [
                { id: 1, name: 'красный', firstColor: '#ff0000', secondColor: null }
            ]
        };
        const mockResponse = {
            data: mockSettings
        };

        mockAxios.get.mockResolvedValueOnce(mockResponse);
        const retrievedSettings = await retrieveCatalogueSettings();
        expect(retrievedSettings).toBeTruthy();
    });

});

