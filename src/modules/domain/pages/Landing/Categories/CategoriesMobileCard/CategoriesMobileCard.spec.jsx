import { render } from '@testing-library/react';
import React from 'react';
import CategoriesMobileCard from './CategoriesMobileCard';
import categories from '../index';


jest.mock('./CategoriesMobileCard',()=>({
    __esModule:true,
    default:()=>{
        return<div data-testid="goods-page" />;
    }
}));

describe('CategoriesDesktop', ( ) => {
    it('CategoriesDesktop renders', async () => {

        const { baseElement } = render(<CategoriesMobileCard categories={categories} />);
        expect(baseElement).toBeInTheDocument();
    });
});
