import React from 'react';
import { render, waitFor } from '@testing-library/react';
import GoodsSetting from './index';
import { BrowserRouter } from 'react-router-dom';
import { mockCatalogueItemsResponse } from '../../../../__mocks__/mockCatalogueItemsResponse';
import { mockCatalogueSettingsResponse } from '../../../../__mocks__/mockCatalogueSettingsResponse';
import { ROUTER_VARIABLES } from '../../adminRoutes';

jest.mock('../../../../common/api/catalogueSettings/retrieveCatalogueSettings', () =>({
    __esModule: true,
    default: () => Promise.resolve(mockCatalogueSettingsResponse),
}));

jest.mock('../../../../common/api/catalogueItems/getCatalogueItems', () =>({
    __esModule: true,
    default: () => Promise.resolve(mockCatalogueItemsResponse),
}));

describe('GoodsSetting', () => {
    it('should render correctly', async () => {
        const { container } = render(<GoodsSetting/>, { wrapper: BrowserRouter });

        await waitFor(async () => {
            expect(container.getElementsByClassName('GoodsSetting')[0]).toBeInTheDocument();
        });
    });

    it('should change query params to BASE FILTER ID', async () => {
        window.history.pushState({}, 'Test Title', '/goods-setting');
        render(<GoodsSetting/>, { wrapper: BrowserRouter });

        await waitFor(() => {
            expect(window.location.search).toBe(`?${ROUTER_VARIABLES.BASE_GOODS_FILTER.name}=${ROUTER_VARIABLES.BASE_GOODS_FILTER.id}`);
        });
    });

    it('should not change query params', async () => {
        window.history.pushState({}, 'Test Title', '/goods-setting?categories=84&materials=34%2C4%2C64%2C54');
        render(<GoodsSetting/>, { wrapper: BrowserRouter });

        await waitFor(() => {
            expect(window.location.search).toBe('?categories=84&materials=34%2C4%2C64%2C54');
        });
    });
});
