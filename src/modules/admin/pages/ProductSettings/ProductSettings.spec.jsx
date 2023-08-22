import ProductSettings from './ProductSettings';
import React from 'react';
import mockAxios from 'jest-mock-axios';
import { mockCatalogueSettingsResponse } from '../../../../__mocks__/mockCatalogueSettingsResponse';
import { mockCatalogueItemsResponse } from '../../../../__mocks__/mockCatalogueItemsResponse';
import renderWithStoreAndRouter from '../../../../common/util/tests/renderWithStoreAndRouter';
import { ModalProvider } from 'react-modal-hook';


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
        const baseElem = renderWithStoreAndRouter(
            <ModalProvider>
                <ProductSettings/>
            </ModalProvider>
        ).baseElement;
        expect(baseElem).toBeInTheDocument();
    });
});
