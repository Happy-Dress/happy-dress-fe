import retrieveCatalogSettings from './retrieveCatalogSettings';
import { vi } from 'vitest';
import axios from 'axios';

vi.mock('axios');

describe('retrieveCatalogueSettings', () => {

    beforeEach(() => {
        vi.clearAllMocks();
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

        const mockGet = vi.mocked(axios.get);
        mockGet.mockResolvedValueOnce(mockResponse);
        
        const retrievedSettings = await retrieveCatalogSettings(false);
        expect(retrievedSettings).toBeTruthy();
    });

});

