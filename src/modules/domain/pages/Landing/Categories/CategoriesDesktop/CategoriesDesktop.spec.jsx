import { render } from '@testing-library/react';
import React from 'react';
import CategoriesDesktop from './CategoriesDesktop';


const categories = [
    {
        id: 1,
        imageUrl: 'http://drive.google.com/uc?export=view&id=1GzPcAb4BzO3BhUD8ATRTltmTRwKDOqz5',
        name: 'Свадебные',
        description: 'Описание'
    }
];

describe('CategoriesDesktop', ( ) => {
    it('CategoriesDesktop renders', async () => {
        const { baseElement } = render(<CategoriesDesktop categories={categories} />);
        expect(baseElement).toBeInTheDocument();
    });
});
