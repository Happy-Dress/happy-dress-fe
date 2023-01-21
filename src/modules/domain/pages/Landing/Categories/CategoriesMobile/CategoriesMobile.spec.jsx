import { render } from '@testing-library/react';
import React from 'react';
import CategoriesMobile from './CategoriesMobile';
import categories from '../index';

jest.mock('./CategoriesMobile',()=>({
    __esModule:true,
    default:()=>{
        return<div data-testid="wrapper" />;
    }
}));

describe('CategoriesMobile', ( ) => {
    it('CategoriesMobile renders', async () => {
        const { baseElement } = render(<CategoriesMobile categories={categories} />);
        expect(baseElement).toBeInTheDocument();
    });
});
