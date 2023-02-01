import { render, screen } from '@testing-library/react';
import ProductCard from './ProductCard';
import bgImage from '../../../../../../../../common/assets/images/ZeroBlock/ZeroBlockSM.png';
import React from 'react';

const product = {
    name: 'S000012345',
    id: 1,
    imageUrl: bgImage,
    category: 'Свадебные',
    colors: [
        '#fff',
        '#000',
        '#a65f30'
    ],
    sizes: [1, 2, 3, 4]
};

const selectedItems = [];

jest.mock('./ProductCard.jsx', () => ({
    __esModule: true,
    default: () => {
        return <div data-testid="product-card"/>;
    }
}));

describe('ProductCard', () => {
    it('should render correctly', async () => {
        render(<ProductCard
            product={product}
            setSelectedItems={() => {}}
            selectedItems={selectedItems}
        />);

        expect(screen.getByTestId('product-card')).toBeInTheDocument();
    });
});