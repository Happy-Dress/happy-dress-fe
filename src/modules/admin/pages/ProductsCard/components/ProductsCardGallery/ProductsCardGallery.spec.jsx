import { render, screen } from '@testing-library/react';
import ProductsCardGallery from './index';

const mockColor = {
    id: 1,
    firstColor: '#FF0000',
    name: 'красно-белый',
    secondColor: '#FFFFFF',
    orderNumber: 1,
};

const productColorImages = {
    id: 1,
    color: mockColor,
    imageURLs: ['plain text'],
};

const mockProps = {
    productColorImages: [productColorImages],
    setProductColorImages: jest.fn(),
};

let baseElem;

describe('ProductsCardGallery', () => {
    beforeEach(() => {
        baseElem = render(<ProductsCardGallery
            productColorImages={mockProps.productColorImages}
            setProductColorImages={mockProps.setProductColorImages}
        />).baseElement;
    });

    it('should render', () => {
        expect(baseElem).toBeInTheDocument();
        expect(screen.getAllByTestId('color-images-item')).toHaveLength(mockProps.productColorImages.length);
    });
});