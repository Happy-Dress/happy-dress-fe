import { screen, waitFor } from '@testing-library/react';
import React from 'react';
import CategoriesDesktop from './CategoriesDesktop';
import userEvent from '@testing-library/user-event';
import renderWithStoreAndRoutes from '../../../../../../common/util/tests/renderWithStoreAndRouter';
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
        description: 'plain text'
    }
];

describe('CategoriesDesktop', ( ) => {
    it('CategoriesDesktop renders', async () => {
        const { baseElement } = renderWithStoreAndRoutes(<CategoriesDesktop categories={categories} />);
        expect(baseElement).toBeInTheDocument();
    });

    it('should press left and right buttons', async () => {
        renderWithStoreAndRoutes(<CategoriesDesktop categories={categories} />);
        const rightArrow = screen.getByTestId('right-arrow');
        const leftArrow = screen.getByTestId('left-arrow');

        const secondCard = screen.getByTestId('card_1');
        const secondPic = secondCard.querySelector('img');

        const firstCard = screen.getByTestId('card_0');
        const firstPic = firstCard.querySelector('img');

        expect(secondPic).toHaveAttribute('class', 'small');
        await userEvent.click(rightArrow);
        expect(secondPic).toHaveAttribute('class', 'main small');

        expect(firstPic).toHaveAttribute('class', 'medium');
        await userEvent.click(leftArrow);
        expect(firstPic).toHaveAttribute('class', 'main medium');
    });

    it('should click on image', async () => {
        renderWithStoreAndRouter(<CategoriesDesktop categories={categories} />);
        const mockScrollTo = jest.fn();
        Object.defineProperty(window, 'scrollTo', {
            value: mockScrollTo,
            writable: true,
        });
        await waitFor(() => {
            userEvent.click(screen.getAllByAltText('category card')[0]);
        });
        expect(mockScrollTo).toHaveBeenCalled();
    });
});
