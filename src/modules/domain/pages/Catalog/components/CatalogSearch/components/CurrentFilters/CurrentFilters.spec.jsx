import { screen } from '@testing-library/react';
import CurrentFilters from './CurrentFilters';
import renderWithStore from '../../../../../../../../common/util/tests/renderWithStore';
import { mockCatalogueSettingsResponse } from '../../../../../../../../__mocks__/mockCatalogueSettingsResponse';

const preloadedStore = {
    productsSearch: {
        loading: false,
        filters: {
            category: mockCatalogueSettingsResponse.categories[0].id,
            models: [],
            materials: [],
            colors: [],
            sizes: [],
        }
    },
    catalogueSettings: {
        loading: false,
        settings: {
            ...mockCatalogueSettingsResponse
        }
    }
};

describe('CurrentFilters', () => {
    it('should render', () => {
        const { baseElement } = renderWithStore(<CurrentFilters />, preloadedStore);

        screen.debug();
        expect(baseElement).toBeInTheDocument();
        expect(screen.getByText(mockCatalogueSettingsResponse.categories[0].name)).toBeInTheDocument();
    });
});
