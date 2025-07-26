import { vi } from 'vitest';
import mockProduct from '../../../../../__mocks__/mockProduct';
import ProductMobile from './ProductMobile';
import renderWithStoreAndRoutes from '../../../../../common/util/tests/renderWithStoreAndRouter';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';


const {
    product,
    uniqueColors,
    currentColorSize,
    mainImageUrl,
    selectedImage,
} = mockProduct;

let baseElement;



describe('ProductMobile', () => {

    beforeEach(() => {
        baseElement = renderWithStoreAndRoutes(<ProductMobile
            product={product} productColorImages={product.productColorImages[0]} currentColorSize={currentColorSize}
            uniqueColors={uniqueColors} mainImageUrl={mainImageUrl} selectedImage={selectedImage}
            handleSizeClick={vi.fn()}
        />).baseElement;
    });

    it('should render correctly', () => {
        expect(baseElement).toBeInTheDocument();
    });

    it('should show size table', async () => {
        const mockScrollTo = vi.fn();
        Object.defineProperty(window, 'scrollTo', {
            value: mockScrollTo,
            writable: true,
        });
        const buttonTable = screen.getByText('Таблица размеров');
        await waitFor(() => {
            userEvent.click(buttonTable);
        });
        const table = screen.getByTestId('size-table');
        expect(table).toBeInTheDocument();
    });

    it('should click another size and color', async () => {
        const sizeElement = await screen.getByTestId(`test-${uniqueColors[1].name}-${product.productColorSizes[2].size.sizeValue}-item`);
        await waitFor( () => {
            userEvent.click(sizeElement);
        });
        const images = screen.getAllByAltText(`product image color ${uniqueColors[0].name}`);
        expect(images[0]).toHaveAttribute('src', product.productColorImages[1].imageURLs[1]);
    });
});