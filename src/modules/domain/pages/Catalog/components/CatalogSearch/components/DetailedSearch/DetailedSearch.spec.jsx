import renderWithStore from '../../../../../../../../common/util/tests/renderWithStore';
import DetailedSearch from './DetailedSearch';
import React from 'react';
import { screen } from '@testing-library/dom';
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

describe('DetailedSearch', () => {
    it('should render correctly', () =>{
        const { baseElement } = renderWithStore(<DetailedSearch/>, preloadedStore);
        screen.debug();
        expect(baseElement).toBeInTheDocument();
    });
});
