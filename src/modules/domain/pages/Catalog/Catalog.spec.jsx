import React from 'react';
import { render, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Catalog from './Catalog';
import { DeviceTypeContext } from '../../../../common/ui/contexts/DeviceType/DeviceTypeContext';
import { mockCatalogueItemsResponse } from '../../../../__mocks__/mockCatalogueItemsResponse';
import { mockCatalogueSettingsResponse } from '../../../../__mocks__/mockCatalogueSettingsResponse';


jest.mock('../../../../common/api/catalogueSettings/retrieveCatalogueSettings', () =>({
    __esModule: true,
    default: () => Promise.resolve(mockCatalogueSettingsResponse),
}));


jest.mock('../../../../common/api/catalogueItems/getCatalogueItems', () => ({
    __esModule: true,
    default: () => Promise.resolve(mockCatalogueItemsResponse)
}));

describe('Catalog', () => {
    it('should render correctly', async () => {
        const { container } = render(
            <DeviceTypeContext.Provider value={{ isMobile: false, isDesktop: true }}>
                <Catalog/>
            </DeviceTypeContext.Provider>, { wrapper: BrowserRouter });
        await waitFor(async () => {
            const catalog = container.getElementsByClassName('Catalog')[0];
            const catalogHeader = container.getElementsByClassName('CatalogHeaderDesktop')[0];
            const catalogContent = container.getElementsByClassName('CatalogContent')[0];
            const categoriesSidebar = container.getElementsByClassName('CategoriesSidebar')[0];

            expect(catalog).toBeInTheDocument();
            expect(catalogHeader).toBeInTheDocument();
            expect(catalogContent).toBeInTheDocument();
            expect(categoriesSidebar).toBeInTheDocument();
        });
    });
    it('should render correctly with mobile', async () => {
        const { container } = render(
            <DeviceTypeContext.Provider value={{ isMobile: true, isDesktop: false }}>
                <Catalog/>
            </DeviceTypeContext.Provider>, { wrapper: BrowserRouter });
        await waitFor(async () => {
            const catalog = container.getElementsByClassName('Catalog')[0];
            const catalogHeader = container.getElementsByClassName('CatalogHeaderMobile')[0];
            const catalogContent = container.getElementsByClassName('CatalogContent')[0];
            const categoriesSidebar = container.getElementsByClassName('CategoriesSidebar')[0];

            expect(catalog).toBeInTheDocument();
            expect(catalogHeader).toBeInTheDocument();
            expect(catalogContent).toBeInTheDocument();
            expect(categoriesSidebar).toBe(undefined);
        });
    });
});
