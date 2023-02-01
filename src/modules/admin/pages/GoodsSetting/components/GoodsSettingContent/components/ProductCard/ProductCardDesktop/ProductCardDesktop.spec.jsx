import { waitFor } from '@testing-library/dom';
import { act, cleanup, render, screen } from '@testing-library/react';
import React from 'react';
import ProductCardDesktop from './ProductCardDesktop';
import bgImage from '../../../../../../../../../common/assets/images/ZeroBlock/ZeroBlockSM.png';
import userEvent from '@testing-library/user-event';

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

describe('ProductCardAddDesktop', () => {
    it('should render correctly', async () => {
        await waitFor(() => {
            const { container } = render(
                <ProductCardDesktop
                    isActive={false}
                    clickHandler={() => {}}
                    product={product}
                />
            );

            expect(container.getElementsByClassName('ProductCardDesktop')[0]).toBeInTheDocument();
        });
    });

    it('should change icon on isActive=false', async () => {
        await waitFor(async () => {
            const { container } = render(
                <ProductCardDesktop
                    isActive={false}
                    clickHandler={() => {}}
                    product={product}
                />
            );

            await act(() => {
                userEvent.hover(container.getElementsByClassName('ProductCardDesktop')[0]);
            });

            expect(screen.getByTestId('empty checkbox')).toBeInTheDocument();

            render(
                <ProductCardDesktop
                    isActive={true}
                    clickHandler={() => {}}
                    product={product}
                />
            );

            expect(screen.getByTestId('active checkbox')).toBeInTheDocument();
        });
    });
    it('should change icon on isActive=true', async () => {
        await waitFor(async () => {
            render(
                <ProductCardDesktop
                    isActive={true}
                    clickHandler={() => {}}
                    product={product}
                />
            );

            expect(screen.getByTestId('active checkbox')).toBeInTheDocument();
            cleanup();

            const { container } = render(
                <ProductCardDesktop
                    isActive={false}
                    clickHandler={() => {}}
                    product={product}
                />
            );

            await act(() => {
                userEvent.hover(container.getElementsByClassName('ProductCardDesktop')[0]);
            });

            expect(screen.getByTestId('empty checkbox')).toBeInTheDocument();
        });
    });
});