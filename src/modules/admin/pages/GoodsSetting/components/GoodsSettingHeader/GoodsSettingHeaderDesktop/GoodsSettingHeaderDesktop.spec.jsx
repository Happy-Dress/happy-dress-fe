import React from 'react';
import { act, render, screen, waitFor } from '@testing-library/react';
import GoodsSettingHeaderDesktop from './GoodsSettingHeaderDesktop';
import { BrowserRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import { mockCatalogueSettingsResponse } from '../../../../../../../__mocks__/mockCatalogueSettingsResponse';

describe('GoodsSettingHeaderDesktop', () => {

    it('should render correct layout', async () => {
        const { container } = render(<GoodsSettingHeaderDesktop filters={mockCatalogueSettingsResponse}/>, { wrapper: BrowserRouter });
        await waitFor(() => {
            const title = screen.getAllByText('Управление товаром');
            expect(title.length).toBe(2);
            expect(container.getElementsByClassName('searchContainer').length).toBe(1);
            expect(container.getElementsByClassName('DressCategories').length).toBe(1);
            expect(container.getElementsByClassName('searchBar').length).toBe(1);
            expect(container.getElementsByClassName('filters').length).toBe(1);
            expect(container.getElementsByClassName('currentFilters').length).toBe(1);
        });
    });

    it('should have active dress category', async () => {
        window.history.pushState({}, 'Test Title', '/admin/panel/goods-setting?categories=84');
        const { container } = render(<GoodsSettingHeaderDesktop filters={mockCatalogueSettingsResponse}/>, { wrapper: BrowserRouter });
        await waitFor(() => {
            const active = container.getElementsByClassName('active');
            expect(active.length).toBe(1);
        });
    });

    it('should open filters section', async () => {
        const { container } = render(<GoodsSettingHeaderDesktop filters={mockCatalogueSettingsResponse}/>, { wrapper: BrowserRouter });
        await waitFor(async () => {
            let filters = await container.getElementsByClassName('filters');

            expect(filters[0]).toHaveStyle('display: none');

            await act(() => {
                userEvent.click(container.querySelector('#filterIcon'));
            });

            expect(filters[0]).toHaveStyle('display: flex');
        });
    });
});
