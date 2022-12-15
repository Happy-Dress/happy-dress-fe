import { render } from '@testing-library/react';
import React from 'react';
import CategoriesDesktop from './CategoriesDesktop';
import categories from '../index';


jest.mock('./CategoriesDesktop',()=>({
    __esModule:true,
    default:()=>{
        return<div data-testid="goods-page" />;
    }
}));

describe('CategoriesDesktop', ( ) => {
    it('CategoriesDesktop renders', async () => {

        const { baseElement } = render(<CategoriesDesktop categories={categories} />);
        expect(baseElement).toBeInTheDocument();
    });
});
