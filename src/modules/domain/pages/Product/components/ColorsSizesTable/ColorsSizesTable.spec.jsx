import { render, screen, waitFor } from '@testing-library/react';
import ColorsSizesTable from './index';
import userEvent from '@testing-library/user-event';
import mockProduct from '../../../../../../__mocks__/mockProduct';

const {
    product,
    uniqueColors,
    currentColorSize,
} = mockProduct;
const sizes = [38, 40, 42, 44, 46, 48, 50, 52];
const handleSizeClick = jest.fn();
let baseElement;

describe('ColorsSizesTable', () => {

    beforeEach(() => {
        baseElement = render(<ColorsSizesTable uniqueColors={uniqueColors} sizes={sizes}
            product={product} currentColorSize={currentColorSize}
            handleSizeClick={handleSizeClick}/>).baseElement;
    });

    it('should render correctly', () => {
        expect(baseElement).toBeInTheDocument();
    });

    it('should handle on size click', async () => {
        const sizeElement = await screen.getByTestId(`test-${uniqueColors[0]}-${sizes[0]}-item`);
        await waitFor( () => {
            userEvent.click(sizeElement);
        });
        expect(handleSizeClick).toHaveBeenCalled();
    });
});