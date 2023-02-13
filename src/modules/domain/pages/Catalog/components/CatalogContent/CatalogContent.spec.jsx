import React from 'react';
import { render, screen } from '@testing-library/react';
import { waitFor } from '@testing-library/dom';
import CatalogContent from './CatalogContent';
import { BrowserRouter } from 'react-router-dom';
import { mockCatalogueItemsResponse } from '../../../../../../__mocks__/mockCatalogueItemsResponse';

describe('CatalogContent', () => {
    it('should render correctly', async () => {
        await waitFor(() => {
            const { container } = render(<CatalogContent items={mockCatalogueItemsResponse} isLoading={false}/>, { wrapper: BrowserRouter });

            expect(container.getElementsByClassName('CatalogContent')[0]).toBeInTheDocument();
        });
    });
    it('should render loader', async () => {

        render(<CatalogContent items={mockCatalogueItemsResponse} isLoading={true}/>, { wrapper: BrowserRouter });
        expect(screen.getByText('Loader')).toBeInTheDocument();
    });
});
