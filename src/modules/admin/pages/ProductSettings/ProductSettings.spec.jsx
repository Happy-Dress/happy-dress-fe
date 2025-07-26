import { vi } from 'vitest';
import ProductSettings from './ProductSettings';
import React from 'react';
import { mockCatalogueSettingsResponse } from '../../../../__mocks__/mockCatalogueSettingsResponse';
import { mockCatalogueItemsResponse } from '../../../../__mocks__/mockCatalogueItemsResponse';
import renderWithStoreAndRouter from '../../../../common/util/tests/renderWithStoreAndRouter';
import { ModalProvider } from 'react-modal-hook';


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
        const baseElem = renderWithStoreAndRouter(
            <ModalProvider>
                <ProductSettings/>
            </ModalProvider>
        ).baseElement;
        expect(baseElem).toBeInTheDocument();
    });
});
