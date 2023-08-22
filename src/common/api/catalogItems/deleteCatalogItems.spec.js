import mockAxios from 'jest-mock-axios';
import { deleteCatalogItems } from './deleteCatalogItems';

describe('deleteCatalogItems', () => {
    it('should return expected values', async () => {
        const mockFn = mockAxios.delete;
        await deleteCatalogItems(1);
        expect(mockFn).toHaveBeenCalled();
    });
});