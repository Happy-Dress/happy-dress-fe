import updateSettings from './updateSettings';
import { vi } from 'vitest';
import axios from 'axios';

vi.mock('axios');

describe('updateSettings', () => {

    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('should update settings', async () => {
        // Setup
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

        const mockPost = vi.mocked(axios.post);
        mockPost.mockResolvedValueOnce(mockResponse);

        // Run
        const updatedSettings = await updateSettings(mockSettings);

        // Verify
        expect(updatedSettings).toBeTruthy();
    });

});
