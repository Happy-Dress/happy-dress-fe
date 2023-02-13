import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { CatalogHeaderDesktop } from './index';
import { mockCatalogueSettingsResponse } from '../../../../../../../../__mocks__/mockCatalogueSettingsResponse';

describe('CatalogHeaderDesktop', () => {

    it('should render correct layout', async () => {
        window.history.pushState({}, 'Test Title', '/catalog?categories=84');
        const { container } = render(<CatalogHeaderDesktop filters={mockCatalogueSettingsResponse}/>, { wrapper: BrowserRouter });
        await waitFor(() => {
            expect(container.getElementsByClassName('filtersContainer').length).toBe(1);
            expect(screen.getByText('Свадебные')).toBeInTheDocument();
            expect(container.getElementsByClassName('SearchBarInput').length).toBe(1);
            expect(container.getElementsByClassName('filters').length).toBe(1);
        });
    });
    it('should render without error', async () => {
        const { container } = render(<CatalogHeaderDesktop filters={{}}/>, { wrapper: BrowserRouter });
        expect(container.getElementsByClassName('filters').length).toBe(1);
    });
});
