import mockProduct from '../../../../../__mocks__/mockProduct';
import mockAxios from 'jest-mock-axios';
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

    afterEach(() => {
        mockAxios.reset();
    });
    
    beforeEach(() => {
        baseElement = renderWithStoreAndRoutes(<ProductMobile
            product={product} productColorImages={product.productColorImages[0]} currentColorSize={currentColorSize}
            uniqueColors={uniqueColors} mainImageUrl={mainImageUrl} selectedImage={selectedImage}
        />).baseElement;
    });

    it('should render correctly', () => {
        expect(baseElement).toBeInTheDocument();
    });

    it('should show size table', async () => {
        const mockScrollTo = jest.fn();
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
});