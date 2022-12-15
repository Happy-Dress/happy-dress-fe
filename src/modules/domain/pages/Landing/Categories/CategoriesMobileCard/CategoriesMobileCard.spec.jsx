import { render } from '@testing-library/react';
import React from 'react';
import CategoriesMobileCard from './CategoriesMobileCard';
import categories from '../Categories';



describe('CategoriesDesktop', ( ) => {
    it('CategoriesDesktop renders', async () => {
        const { baseElement } = render(<CategoriesMobileCard  categories={categories} />);
        expect(baseElement).toBeInTheDocument();
    });
});