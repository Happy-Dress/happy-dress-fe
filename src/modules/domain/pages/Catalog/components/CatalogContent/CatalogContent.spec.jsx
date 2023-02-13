
import React from 'react';
import { render, screen } from '@testing-library/react';
import { waitFor } from '@testing-library/dom';
import CatalogContent from './CatalogContent';
import { BrowserRouter } from 'react-router-dom';

const response = [
    {
        id: 1,
        name: 'S000012345',
        colors: [
            '#fff',
            '#000',
            '#a65f30'
        ],
        sizes: [1, 2, 3, 4],
        category: 'Свадебные'
    },
    {
        id: 2,
        name: 'S000012346',
        colors: [
            '#fff',
            '#000',
            '#a65f30'
        ],
        sizes: [1, 2, 3, 4],
        category: 'Деловой стиль'
    },
];

describe('CatalogContent', () => {
    it('should render correctly', async () => {
        await waitFor(() => {
            const { container } = render(<CatalogContent items={response} isLoading={false}/>, { wrapper: BrowserRouter });

            expect(container.getElementsByClassName('CatalogContent')[0]).toBeInTheDocument();
        });
    });
    it('should render loader', async () => {

        render(<CatalogContent items={response} isLoading={true}/>, { wrapper: BrowserRouter });
        expect(screen.getByText('Loader')).toBeInTheDocument();
    });
});