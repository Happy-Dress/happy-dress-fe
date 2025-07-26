import React from 'react';
import { vi } from 'vitest';
import Catalog from './Catalog';
import { mockCatalogueSettingsResponse } from '../../../../__mocks__/mockCatalogueSettingsResponse';
import { mockCatalogueItemsResponse } from '../../../../__mocks__/mockCatalogueItemsResponse';
import renderWithStoreAndRoutes from '../../../../common/util/tests/renderWithStoreAndRouter';

vi.mock('../../../../common/api',
    ()=>({
        retrieveCatalogueSettings: async () => mockCatalogueSettingsResponse,
        getCatalogueItems: async () => mockCatalogueItemsResponse,
    })
);

describe('ProductSettings', () =>{

    beforeAll(() => {
        vi.useFakeTimers();
    });



    it('should load settings and catalogue items', async () =>{
        const baseElem = renderWithStoreAndRoutes(<Catalog/>).baseElement;
        expect(baseElem).toBeInTheDocument();
    });

});
