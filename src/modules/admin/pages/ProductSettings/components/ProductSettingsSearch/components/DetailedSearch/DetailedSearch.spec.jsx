import renderWithStore from '../../../../../../../../common/util/tests/renderWithStore';
import DetailedSearch from './DetailedSearch';
import React from 'react';

describe('DetailedSearch', () => {
    it('should render correctly', () =>{
        const { baseElement } = renderWithStore(<DetailedSearch/>);
        expect(baseElement).toBeInTheDocument();
    });
});
