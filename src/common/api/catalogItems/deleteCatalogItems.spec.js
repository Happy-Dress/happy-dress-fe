import { deleteCatalogItems } from './deleteCatalogItems';
import { vi } from 'vitest';
import axios from 'axios';

vi.mock('axios');

describe('deleteCatalogItems', () => {

    beforeEach(() => {
        vi.clearAllMocks();
    });
    
    it('should return expected values', async () => {
        // Setup
        const mockDelete = vi.mocked(axios.delete);
        mockDelete.mockResolvedValueOnce(null);

        // Run
        await deleteCatalogItems(1);

        //Verify
        expect(mockDelete).toHaveBeenCalled();
    });
});