import ProductSettings from './ProductSettings';
import React from 'react';
import { waitFor, screen } from '@testing-library/dom';
import mockAxios from 'jest-mock-axios';
import { mockCatalogueSettingsResponse } from '../../../../__mocks__/mockCatalogueSettingsResponse';
import { mockCatalogueItemsResponse } from '../../../../__mocks__/mockCatalogueItemsResponse';
import renderWithStoreAndRouter from '../../../../common/util/tests/renderWithStoreAndRouter';


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
        renderWithStoreAndRouter(<ProductSettings/>);
        await waitFor(() =>{
            expect(screen.getAllByAltText('dress preview')[0]).toBeInTheDocument();
        });
    });
});
