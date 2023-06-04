import { render, screen } from '@testing-library/react';
import ProductsCardsImage from './ProductsCardsImage';
import userEvent from '@testing-library/user-event';

const mockAddFn = jest.fn();
const mockDeleteFn = jest.fn();

describe('ProductsCardImage', () => {
    it('should render with loader', () => {
        render(<ProductsCardsImage isLoaded={false} />);

        expect(screen.getByTestId('pciLoader')).toBeInTheDocument();
    });

    it('should render with Image', () => {
        render(<ProductsCardsImage isLoaded={true} imageUrl={'imageUrl'} alt={'alt'}/>);

        expect(screen.getByAltText('alt')).toBeInTheDocument();
    });

    it('should call onAdd function', () => {
        render(<ProductsCardsImage isLoaded={true} imageUrl={''} onDelete={mockDeleteFn} onAdd={mockAddFn} />);

        const addIcon = screen.getByTestId('addIcon');

        expect(addIcon).toBeInTheDocument();
        userEvent.click(addIcon);
        expect(mockAddFn).toHaveBeenCalled();
    });

    it('should call onDelete function', () => {
        render(<ProductsCardsImage isLoaded={true} imageUrl={'imageUrl'} onDelete={mockDeleteFn} onAdd={mockAddFn} />);

        const deleteIcon = screen.getByTestId('deleteIcon');
        expect(deleteIcon).toBeInTheDocument();
        userEvent.click(deleteIcon);
        expect(mockDeleteFn).toHaveBeenCalled();
    });
});
