import { render, screen } from '@testing-library/react';
import ProductCardColorsHeader from './index';

const mockSize = {
    id: 1,
    sizeValue: 1,
};

const mockProps = {
    sizes: [mockSize],
};

let baseElem;

describe('ProductCardColorsHeader', () => {
    beforeEach(() => {
        baseElem = render(<ProductCardColorsHeader sizes={mockProps.sizes}/>).baseElement; 
    });

    it('should render', () => {
        expect(baseElem).toBeInTheDocument();
        expect(screen.getAllByTestId('size-item')).toHaveLength(1);
    });
});