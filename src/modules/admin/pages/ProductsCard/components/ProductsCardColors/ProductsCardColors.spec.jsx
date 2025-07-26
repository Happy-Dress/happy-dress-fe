import { vi } from 'vitest';
import { render } from '@testing-library/react';
import ProductsCardColors from './index';

const mockColor = {
    id: 1,
    firstColor: '#FF0000',
    name: 'красно-белый',
    secondColor: '#FFFFFF',
    orderNumber: 1,
};

const mockSize = {
    id: 1,
    sizeValue: 1,
};

const mockProps = {
    productColorSizes: [{
        color: mockColor,
        size: mockSize,
    }],
    allColors: [mockColor],
    allSizes: [mockSize],
    setProductColorSizes: vi.fn(),
};

let baseElem;

describe('ProductsCardColors', () => {
    beforeEach(() => {
        baseElem = render(<ProductsCardColors 
            productColorSizes={mockProps.productColorSizes}
            allColors={mockProps.allColors}
            allSizes={mockProps.allSizes}
            setProductColorSizes={mockProps.setProductColorSizes}
        />).baseElement;
    });

    it('should render', () => {
        expect(baseElem).toBeInTheDocument();
    });
});