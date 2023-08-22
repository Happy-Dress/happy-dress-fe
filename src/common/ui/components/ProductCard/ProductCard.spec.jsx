import ProductCard from './ProductCard';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

global.scrollTo = jest.fn();
const mockedUseNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
    useNavigate: () => mockedUseNavigate,
}));


const mockProduct = {
    id: 1,
    name: 'plain text',
    description: 'plain text',
    mainImageUrl: 'plain text',
    category: {
        id: 1,
        description: 'plain text',
        imageUrl: 'plain text',
        name: 'plain text',
        orderNumber: 1,
    },
    model: {
        id: 1,
        name: 'plain text',
        orderNumber: 1,
    },
    materials: [{
        id: 1,
        name: 'plain text',
        orderNumber: 1,
    }],
    productColorSizes: [{
        color: {
            id: 1,
            firstColor: '#FF0000',
            name: 'красно-белый',
            secondColor: '#FFFFFF',
            orderNumber: 1,
        },
        size: {
            id: 1,
            sizeValue: 1,
        },
    }],
    productColorImages: [{
        colorId: 1,
        imageURLs: ['plain text'],
    }],
};

let baseElem;

describe('ProductCard', () => {
    beforeEach(() => {
        baseElem = render(<ProductCard
            product={mockProduct}/>).baseElement;
    });

    it('should render correctly', () => {
        expect(baseElem).toBeInTheDocument();
    });

    it('should have 1 color circle', () => {
        const circleElem = screen.getAllByTestId('color-circle');
        expect(circleElem).toHaveLength(1);
    });

    it('should handle open click', () => {
        userEvent.click(screen.getByTestId('product-card'));
        expect(mockedUseNavigate).toHaveBeenCalled();
    });

});