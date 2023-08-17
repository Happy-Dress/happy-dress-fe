import mockProduct from '../../../../../__mocks__/mockProduct';
import mockAxios from 'jest-mock-axios';
import ProductDesktop from './index';
import renderWithStoreAndRouter from '../../../../../common/util/tests/renderWithStoreAndRouter';
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


describe('ProductDesktop', () => {

    afterEach(() => {
        mockAxios.reset();
    });

    beforeEach(() => {
        baseElement = renderWithStoreAndRouter(<ProductDesktop
            product={product} productColorImages={product.productColorImages[0]} currentColorSize={currentColorSize}
            uniqueColors={uniqueColors} mainImageUrl={mainImageUrl} selectedImage={selectedImage}
            handleImageOnLoad={jest.fn()} loadingImages={[false]}
        />).baseElement;
    });

    it('should render correctly', () => {
        expect(baseElement).toBeInTheDocument();
    });

    it('should show size table', async () => {
        const buttonTable = screen.getByText('Таблица размеров');
        await waitFor(() => {
            userEvent.click(buttonTable);
        });
        const table = screen.getByTestId('size-table');
        expect(table).toBeInTheDocument();
    });
});