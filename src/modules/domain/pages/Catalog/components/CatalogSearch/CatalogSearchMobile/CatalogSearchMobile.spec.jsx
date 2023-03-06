import renderWithStore from '../../../../../../../common/util/tests/renderWithStore';
import CatalogSearchMobile from './CatalogSearchMobile';
import React from 'react';


describe('ProductsSettingsSearchMobile', () =>{
    it('should render correctly', () => {
        const { baseElement } = renderWithStore(<CatalogSearchMobile/>);
        expect(baseElement).toBeInTheDocument();
    });
});
