import { screen, render } from '@testing-library/react';
import React from 'react';
import CategoriesMobile from './CategoriesMobile';
import userEvent from '@testing-library/user-event';

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
        const { baseElement } = render(<CategoriesMobile categories={categories} />);
        expect(baseElement).toBeInTheDocument();
    });

    it('should change slide on press dot', async () => {
        render(<CategoriesMobile categories={categories} />);
        const secondDot = screen.getByTestId('dot_1');
        const firstSlideText = screen.getByText('Свадебные');
        expect(firstSlideText).toBeInTheDocument();

        await userEvent.click(secondDot);

        const secondSlideText = screen.getByText('plain text');
        expect(secondSlideText).toBeInTheDocument();
    });
});
