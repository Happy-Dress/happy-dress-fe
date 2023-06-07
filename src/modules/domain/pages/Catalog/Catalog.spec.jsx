import Catalog from './Catalog';
import React from 'react';
import renderWithStore from '../../../../common/util/tests/renderWithStore';
import { waitFor, screen } from '@testing-library/dom';
import mockAxios from 'jest-mock-axios';
import { mockCatalogueSettingsResponse } from '../../../../__mocks__/mockCatalogueSettingsResponse';
import { mockCatalogueItemsResponse } from '../../../../__mocks__/mockCatalogueItemsResponse';

const mockNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockNavigate,
}));


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
        renderWithStore(<Catalog/>);
        await waitFor(() =>{
            expect(screen.getAllByAltText('dress preview')[0]).toBeInTheDocument();
        });
    });

});
