import { render } from '@testing-library/react';
import React from 'react';
import CategoriesDesktop from './CategoriesDesktop';
import categories from '../Categories';



describe('CategoriesDesktop', ( ) => {
    it('CategoriesDesktop renders', async () => {
        const { baseElement } = render(<CategoriesDesktop  categories={categories} />);
        expect(baseElement).toBeInTheDocument();
    });
});