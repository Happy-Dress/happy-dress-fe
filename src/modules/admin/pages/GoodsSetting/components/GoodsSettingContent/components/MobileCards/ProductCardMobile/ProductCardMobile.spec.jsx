import { waitFor } from '@testing-library/dom';
import { act, render, screen } from '@testing-library/react';
import React from 'react';
import ProductCardMobile from './ProductCardMobile';
import userEvent from '@testing-library/user-event';
import bgImage from '../../../../../../../../../common/assets/images/ZeroBlock/ZeroBlockSM.png'

const props = {
    setSelectedItems: () => {},
    name: 'S000012345',
    id: 1,
    previewImage: bgImage,
    category: 'Свадебные',
    colors: [
        '#fff',
        '#000',
        '#a65f30'
    ],
    sizes: [1, 2, 3, 4],
    selectedItems: []
};

describe('ProductCardMobile', () => {
    it('should render correctly', async () => {
        await waitFor(() => {
            const { container } = render(
                <ProductCardMobile
                    setSelectedItems={props.setSelectedItems}
                    name={props.name}
                    id={props.id}
                    previewImage={props.previewImage}
                    category={props.category}
                    colors={props.colors}
                    sizes={props.sizes}
                    selectedItems={props.selectedItems}
                />
            );

            expect(container.getElementsByClassName('ProductCardMobile')[0]).toBeInTheDocument();
        });
    });
    it('should change icon on click', async () => {
        await waitFor(async () => {
            const { container } = render(
                <ProductCardMobile {...props} />
            );

            await act(() => {
                userEvent.click(container.getElementsByClassName('ProductCardMobile')[0]);
            });

            expect(screen.getByTestId('active checkbox')).toBeInTheDocument();
        });
    });
});