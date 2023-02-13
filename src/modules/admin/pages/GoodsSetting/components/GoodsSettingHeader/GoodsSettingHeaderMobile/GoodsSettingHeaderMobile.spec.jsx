import React from 'react';
import { act, render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import GoodsSettingHeaderMobile from './GoodsSettingHeaderMobile';
import { mockCatalogueSettingsResponse } from '../../../../../../../__mocks__/mockCatalogueSettingsResponse';

describe('GoodsSettingHeaderMobile', () => {

    it('should render correct layout', async () => {
        const { container } = render(<GoodsSettingHeaderMobile filters={mockCatalogueSettingsResponse}/>, { wrapper: BrowserRouter });
        await waitFor(() => {
            const title = screen.getAllByText('Управление товаром');
            expect(title.length).toBe(1);
            expect(container.getElementsByClassName('searchContainer').length).toBe(1);
            expect(container.getElementsByClassName('DressCategories').length).toBe(1);
            expect(container.getElementsByClassName('searchBar').length).toBe(1);
            expect(container.getElementsByClassName('filters').length).toBe(1);
            expect(container.getElementsByClassName('currentFilters').length).toBe(1);
        });
    });

    it('should have active dress category', async () => {
        window.history.pushState({}, 'Test Title', '/admin/panel/goods-setting?categories=84');
        const { container } = render(<GoodsSettingHeaderMobile filters={mockCatalogueSettingsResponse}/>, { wrapper: BrowserRouter });
        await waitFor(() => {
            const active = container.querySelector('.DressCategories > p');
            expect(active.textContent).toBe('Свадебные');
        });
    });

    it('should open filters section', async () => {
        const { container } = render(<GoodsSettingHeaderMobile filters={mockCatalogueSettingsResponse}/>, { wrapper: BrowserRouter });
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
