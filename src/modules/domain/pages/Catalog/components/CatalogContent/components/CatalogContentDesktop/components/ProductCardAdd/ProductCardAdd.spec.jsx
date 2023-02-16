import { act, render, screen } from '@testing-library/react';
import ProductCardAdd from './ProductCardAdd';
import userEvent from '@testing-library/user-event';

describe('ProductCardAdd', () => {
    it('should render normal', () => {
        render(<ProductCardAdd />);
        expect(screen.getByTestId('normal')).toBeInTheDocument();
    });

    it('should render hover', async () => {
        const { container } = render(<ProductCardAdd />);
        expect(screen.getByTestId('normal')).toBeInTheDocument();

        await act(async () => {
            userEvent.hover(container.getElementsByClassName('ProductCardAdd')[0]);
        });

        expect(screen.getByTestId('hover')).toBeInTheDocument();

        await act(async () => {
            userEvent.unhover(container.getElementsByClassName('ProductCardAdd')[0]);
        });

        expect(screen.getByTestId('normal')).toBeInTheDocument();
    });
});
