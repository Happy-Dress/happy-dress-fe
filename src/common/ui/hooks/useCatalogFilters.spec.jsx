import { vi } from 'vitest';
import { useCatalogFilters } from './useCatalogFilters';
import { renderHookWithStore } from '../../util/tests/renderWithStore';
import { waitFor } from '@testing-library/react';

const mockDispatch = vi.fn();


vi.mock('react-redux', async (importOriginal) => {
    const actual = await importOriginal();
    return {
        ...actual,
        useDispatch: () => mockDispatch,
    };
});


describe('useCatalogFilters', () => {

    beforeEach(() => {
        vi.clearAllMocks();
    });

    afterEach(() => {
        vi.restoreAllMocks();
    });

    it('it should render and initially load categories', async () => {
        // Setup
        const isSecure = false;
        
        const filters = {
            category: 'test',
        };

        const mockStore = {
            productsSearch: {
                filters
            }
        };
        
        // Run
        renderHookWithStore(() => useCatalogFilters(isSecure), mockStore);

        // Verify
        await waitFor(() => {
            expect(mockDispatch)
                .toHaveBeenCalledTimes(4);
        });
    });

    it('it scroll to recently viewed product card', async () => {
        // Setup
        const isSecure = false;
        
        const mockElement = {
            getBoundingClientRect: () => {
                return {
                    left: 1,
                    top: 1
                };
            }
        };


        window.scrollTo = vi.fn();
        vi.spyOn(document, 'getElementById').mockReturnValue(mockElement);

        const filters = {
            category: 'test',

        };

        const mockStore = {
            productsSearch: {
                filters
            },
            routeTracker: {
                previousRoute: '/domain/catalog/34'
            }
        };

        // Run
        renderHookWithStore(() => useCatalogFilters(isSecure), mockStore);

        // Verify
        await waitFor(() => {
            expect(window.scrollTo).toHaveBeenCalled();
        });
    });
});
