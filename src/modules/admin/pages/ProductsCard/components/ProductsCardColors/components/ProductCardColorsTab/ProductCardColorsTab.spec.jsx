import { render, screen } from '@testing-library/react';
import ProductCardColorsTab from './index';
import userEvent from '@testing-library/user-event';

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
    currentColor: mockColor,
    productColors: [mockColor],
    productSizes: [mockSize],
    allSizes: [mockSize],
    optionsColors: [mockColor],
    handleDelete: jest.fn(),
    handleChangeColor: jest.fn(),
    handleChangeSize: jest.fn(),
    idx: '1',
};

let baseElem;

describe('ProductCardColorsTab', () => {
    beforeEach(() => {
        baseElem = render(<ProductCardColorsTab 
            allSizes={mockProps.allSizes}
            handleChangeSize={mockProps.handleChangeSize}
            handleChangeColor={mockProps.handleChangeColor}
            productColors={mockProps.productColors}
            productSizes={mockProps.productSizes}
            optionsColors={mockProps.optionsColors}
            handleDelete={mockProps.handleDelete}
            currentColor={mockProps.currentColor}
            idx={mockProps.idx}
        />).baseElement;
    });

    it('should render', () => {
        expect(baseElem).toBeInTheDocument();
    });

    it('should handle click on trash', () => {
        userEvent.click(screen.getByTestId('trash'));
        expect(mockProps.handleDelete).toHaveBeenCalled();
    });
});