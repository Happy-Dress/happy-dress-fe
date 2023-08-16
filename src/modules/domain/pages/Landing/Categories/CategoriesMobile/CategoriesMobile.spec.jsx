import { screen } from '@testing-library/react';
import React from 'react';
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

    it('should change slide on press dot', async () => {
        renderWithStoreAndRouter(<CategoriesMobile categories={categories} />);
        const secondDot = screen.getByTestId('dot_1');
        const firstSlide = screen.getByTestId('card_0');
        const secondSlide = screen.getByTestId('card_1');
        expect(firstSlide).toHaveAttribute('class', 'slider_card_active');
        expect(secondSlide).toHaveAttribute('class', 'slider_card_right');

        await userEvent.click(secondDot);

        expect(secondSlide).toHaveAttribute('class', 'slider_card_active');
        expect(firstSlide).toHaveAttribute('class', 'slider_card_left');
    });

});
