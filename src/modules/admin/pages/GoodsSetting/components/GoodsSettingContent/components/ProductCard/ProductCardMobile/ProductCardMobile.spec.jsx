import { waitFor } from '@testing-library/dom';
import { render, screen } from '@testing-library/react';
import React from 'react';
import ProductCardMobile from './ProductCardMobile';
import bgImage from '../../../../../../../../../common/assets/images/ZeroBlock/ZeroBlockSM.png';

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

describe('ProductCardMobile', () => {
    it('should render correctly', async () => {
        await waitFor(() => {
            const { container } = render(
                <ProductCardMobile
                    isActive={false}
                    product={product}
                    clickHandler={() => {}}
                />
            );

            expect(container.getElementsByClassName('ProductCardMobile')[0]).toBeInTheDocument();
        });
    });
    it('should change icon on isActive', async () => {
        await waitFor(async () => {
            render(
                <ProductCardMobile
                    isActive={false}
                    clickHandler={() => {}}
                    product={product}
                />
            );

            expect(screen.queryByTestId('active checkbox')).toBeNull();

            render(
                <ProductCardMobile
                    isActive={true}
                    clickHandler={() => {}}
                    product={product}
                />
            );

            expect(screen.getByTestId('active checkbox')).toBeInTheDocument();
        });
    });
});