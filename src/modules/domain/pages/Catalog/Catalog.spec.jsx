import Catalog from './Catalog';
import React from 'react';
import mockAxios from 'jest-mock-axios';
import { mockCatalogueSettingsResponse } from '../../../../__mocks__/mockCatalogueSettingsResponse';
import { mockCatalogueItemsResponse } from '../../../../__mocks__/mockCatalogueItemsResponse';
import renderWithStoreAndRoutes from '../../../../common/util/tests/renderWithStoreAndRouter';

jest.mock('../../../../common/api',
    ()=>({
        retrieveCatalogueSettings: async () => mockCatalogueSettingsResponse,
        getCatalogueItems: async () => mockCatalogueItemsResponse,
    })
);

describe('ProductSettings', () =>{

    afterEach(() => {
        mockAxios.reset();
    });

    beforeAll(() => {
        jest.useFakeTimers();
    });



    it('should load settings and catalogue items', async () =>{
        const baseElem = renderWithStoreAndRoutes(<Catalog/>).baseElement;
        expect(baseElem).toBeInTheDocument();
    });

});
