import { vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import ProductCardColorsAdd from './index';
import userEvent from '@testing-library/user-event';

const mockSize = {
    id: 1,
    sizeValue: 1,
};

const mockProps = {
    handleAddTab: vi.fn(),
    sizes: [mockSize],
};

let baseElem;

describe('ProductCardColorsAdd', () => {
    beforeEach(() => {
        baseElem = render(<ProductCardColorsAdd 
            handleAddTab={mockProps.handleAddTab} 
            sizes={mockProps.sizes}
        />).baseElement;
    });

    it('should render', () => {
        expect(baseElem).toBeInTheDocument();
    });

    it('should handle click', () => {
        userEvent.click(screen.getByTestId('add-tab'));
        expect(mockProps.handleAddTab).toHaveBeenCalled();
    });
});