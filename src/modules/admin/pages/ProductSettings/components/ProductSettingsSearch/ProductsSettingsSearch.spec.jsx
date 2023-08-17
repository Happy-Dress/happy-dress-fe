import ProductsSettingsSearch from './ProductsSettingsSearch';
import { render } from '@testing-library/react';

describe('ProductsSettingsSearch', () => {
    it('should render', () => {
        const { baseElement } = render(<ProductsSettingsSearch/>);
        expect(baseElement).toBeInTheDocument();
    });
});