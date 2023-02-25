import React from 'react';
import { render, waitFor } from '@testing-library/react';
import Catalog from './Catalog';
import { BrowserRouter } from 'react-router-dom';
import { mockCatalogueItemsResponse } from '../../../../__mocks__/mockCatalogueItemsResponse';
import { mockCatalogueSettingsResponse } from '../../../../__mocks__/mockCatalogueSettingsResponse';
import { ROUTER_VARIABLES } from '../../routerConfig';

jest.mock('../../../../common/api/catalogueSettings/retrieveCatalogueSettings', () =>({
    __esModule: true,
    default: () => Promise.resolve(mockCatalogueSettingsResponse),
}));

jest.mock('../../../../common/api/catalogueItems/getCatalogueItems', () =>({
    __esModule: true,
    default: () => Promise.resolve(mockCatalogueItemsResponse),
}));


describe('Catalog', () => {
    it('should render correctly', async () => {
        const { container } = render(<Catalog/>, { wrapper: BrowserRouter });

        await waitFor(async () => {
            expect(container.getElementsByClassName('Catalog')[0]).toBeInTheDocument();
        });
    });

    it('should change query params to BASE FILTER ID', async () => {
        window.history.pushState({}, 'Test Title', '/catalog');
        render(<Catalog/>, { wrapper: BrowserRouter });

        await waitFor(() => {
            expect(window.location.search).toBe(`?${ROUTER_VARIABLES.BASE_CATALOG_FILTER.name}=${ROUTER_VARIABLES.BASE_CATALOG_FILTER.id}`);
        });
    });

    it('should not change query params', async () => {
        window.history.pushState({}, 'Test Title', '/catalog?categories=84&materials=34%2C4%2C64%2C54');
        render(<Catalog/>, { wrapper: BrowserRouter });

        await waitFor(() => {
            expect(window.location.search).toBe('?categories=84&materials=34%2C4%2C64%2C54');
        });
    });
});
