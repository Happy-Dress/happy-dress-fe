import React from 'react';
import { vi } from 'vitest';
import { screen, waitFor } from '@testing-library/react';
import CategoriesMobile from './CategoriesMobile';
import userEvent from '@testing-library/user-event';
import renderWithStoreAndRouter from '../../../../../../common/util/tests/renderWithStoreAndRouter';

const categories = [
    {
        id: 1,
        imageUrl: 'http://drive.google.com/uc?export=view&id=1GzPcAb4BzO3BhUD8ATRTltmTRwKDOqz5',
        name: 'Свадебные',
        description: 'Описание'
    },
    {
        id: 2,
        imageUrl: 'http://drive.google.com/uc?export=view&id=1f_UdNpkFX_0STt8biOfNWflxViqX7u9R',
        name: 'plain text',
        description: 'description'
    }
];


describe('CategoriesMobile', ( ) => {
    it('CategoriesMobile renders', async () => {
        const { baseElement } = renderWithStoreAndRouter(<CategoriesMobile categories={categories} />);
        expect(baseElement).toBeInTheDocument();

    });


    it('should click on image', async () => {
        renderWithStoreAndRouter(<CategoriesMobile categories={categories} />);
        const mockScrollTo = vi.fn();
        Object.defineProperty(window, 'scrollTo', {
            value: mockScrollTo,
            writable: true,
        });
        await waitFor(() => {
            const elem = screen.getAllByAltText('Slide 1');
            userEvent.click(elem[1]);
        });
        expect(mockScrollTo).toHaveBeenCalled();
    });
});
