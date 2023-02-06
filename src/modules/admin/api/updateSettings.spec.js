import mockAxios from 'jest-mock-axios';
import updateSettings from './updateSettings';

describe('updateSettings', () => {

    afterEach(() => {
        mockAxios.reset();
    });

    it('should update settings', async () => {
        const mockSettings = {
            models: [
                { id: 1, name: 'Пышные' }
            ]
        };
        const mockResponse = {
            data: mockSettings
        };

        mockAxios.post.mockResolvedValueOnce(mockResponse);
        const updatedSettings = await updateSettings(mockSettings);
        expect(updatedSettings).toBeTruthy();
    });

});
