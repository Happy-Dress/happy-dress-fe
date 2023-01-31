import { waitFor } from '@testing-library/dom';
import { act, render, screen } from '@testing-library/react';
import React from 'react';
import ProductCardAddDesktop from './ProductCardAddDesktop';
import userEvent from '@testing-library/user-event';

describe('ProductCardAddDesktop', () => {
    it('should render correctly', async () => {
        await waitFor(() => {
            const { container } = render(<ProductCardAddDesktop onClick={() => {}}/>);

            expect(container.getElementsByClassName('AddProductCardDesktop')[0]).toBeInTheDocument();
        });
    });
    it('should change icon onMouseHover', async () => {
        await waitFor(async() => {
            const { container } = render(<ProductCardAddDesktop onClick={() => {}}/>);

            expect(screen.getByTestId('normal icon')).toBeInTheDocument();
            await act(() => {
                userEvent.hover(container.getElementsByClassName('AddProductCardDesktop')[0]);
            });

            expect(screen.getByTestId('hover icon')).toBeInTheDocument();
        });
    });
});