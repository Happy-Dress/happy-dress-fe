import React from 'react';
import { act, render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import CatalogHeaderMobile from './CatalogHeaderMobile';
import { mockCatalogueSettingsResponse } from '../../../../../../../../__mocks__/mockCatalogueSettingsResponse';

describe('CatalogHeaderMobile', () => {

    it('should render correct layout', async () => {
        const { container } = render(<CatalogHeaderMobile filters={mockCatalogueSettingsResponse}/>, { wrapper: BrowserRouter });
        await waitFor(() => {
            expect(container.getElementsByClassName('DressCategories').length).toBe(1);
            expect(container.getElementsByClassName('searchBar').length).toBe(1);
            expect(container.getElementsByClassName('filters').length).toBe(1);
            expect(container.getElementsByClassName('currentFilters').length).toBe(1);
        });
    });

    it('should have active dress category', async () => {
        window.history.pushState({}, 'Test Title', '/catalog?categories=84');
        const { container } = render(<CatalogHeaderMobile filters={mockCatalogueSettingsResponse}/>, { wrapper: BrowserRouter });
        await waitFor(() => {
            const active = container.querySelector('.DressCategories > p');
            expect(active.textContent).toBe('Свадебные');
        });
    });

    it('should open filters section', async () => {
        const { container } = render(<CatalogHeaderMobile filters={mockCatalogueSettingsResponse}/>, { wrapper: BrowserRouter });
        await waitFor(async () => {
            let filters = await container.getElementsByClassName('filters');

            expect(filters[0]).toHaveStyle('display: none');

            await act(() => {
                userEvent.click(container.querySelector('#filterIcon'));
            });

            expect(filters[0]).toHaveStyle('display: flex');
        });
    });

    it('should close filters section', async () => {
        const { container } = render(<CatalogHeaderMobile filters={mockCatalogueSettingsResponse}/>, { wrapper: BrowserRouter });
        await waitFor(async () => {
            let filters = await container.getElementsByClassName('filters');

            expect(filters[0]).toHaveStyle('display: none');

            await act(() => {
                userEvent.click(container.querySelector('#filterIcon'));
                userEvent.click(screen.getByText('Применить'));
            });

            expect(filters[0]).toHaveStyle('display: none');
        });
    });

    it('should del filters', async () => {
        window.history.pushState({}, 'Test Title', '/catalog?categories=84&models=34');
        render(<CatalogHeaderMobile filters={mockCatalogueSettingsResponse}/>, { wrapper: BrowserRouter });
        await waitFor(async () => {
            expect(window.location.search).toBe('?categories=84&models=34');
            await act(() => {
                userEvent.click(screen.getByText('Сбросить фильтры'));
            });

            expect(window.location.search).toBe('?categories=84');
        });
    });
});
