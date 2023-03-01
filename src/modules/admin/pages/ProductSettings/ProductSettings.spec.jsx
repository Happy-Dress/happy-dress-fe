import ProductSettings from './ProductSettings';
import React from 'react';
import renderWithStore from '../../../../common/util/tests/renderWithStore';
import { waitFor, screen } from '@testing-library/dom';
import mockAxios from 'jest-mock-axios';
import { mockCatalogueSettingsResponse } from '../../../../__mocks__/mockCatalogueSettingsResponse';
import { mockCatalogueItemsResponse } from '../../../../__mocks__/mockCatalogueItemsResponse';


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


    it('should load settings and catalogue items', async () =>{
        renderWithStore(<ProductSettings/>);
        await waitFor(() =>{
            expect(screen.getAllByAltText('dress preview')[0]).toBeInTheDocument();
        });
    });

});
