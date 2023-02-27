import renderWithStore from '../../../../../../../common/util/renderWithStore';
import ProductsSettingsSearchMobile from './ProductsSettingsSearchMobile';
import React from 'react';


describe('ProductsSettingsSearchMobile', () =>{
    it('should render correctly', () => {
        const { baseElement } = renderWithStore(<ProductsSettingsSearchMobile/>);
        expect(baseElement).toBeInTheDocument();
    });
});
