import ProductSettings from './ProductSettings';
import React from 'react';
import renderWithStore from '../../../../common/util/renderWithStore';

describe('ProductSettings', () =>{
    it('should render correctly', () =>{
        const { baseElement } = renderWithStore(<ProductSettings/>);
        expect(baseElement).toBeInTheDocument();
    });
});
