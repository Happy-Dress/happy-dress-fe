import { render, screen } from '@testing-library/react';
import ProductsCardImage from './ProductsCardImage';
import userEvent from '@testing-library/user-event';

const mockAddFn = jest.fn();
const mockDeleteFn = jest.fn();

describe('ProductsCardImage', () => {
    it('should render with loader', () => {
        render(<ProductsCardImage isLoaded={false} />);

        expect(screen.getByTestId('pciLoader')).toBeInTheDocument();
    });

    it('should render with Image', () => {
        render(<ProductsCardImage isLoaded={true} imageUrl={'imageUrl'} alt={'alt'}/>);

        expect(screen.getByAltText('alt')).toBeInTheDocument();
    });

    it('should call onAdd function', () => {
        render(<ProductsCardImage isLoaded={true} imageUrl={''} onDelete={mockDeleteFn} onAdd={mockAddFn} />);

        const addIcon = screen.getByTestId('addIcon');

        expect(addIcon).toBeInTheDocument();
        userEvent.click(addIcon);
        expect(mockAddFn).toHaveBeenCalled();
    });

    it('should call onDelete function', () => {
        render(<ProductsCardImage isLoaded={true} imageUrl={'imageUrl'} onDelete={mockDeleteFn} onAdd={mockAddFn} />);

        const deleteIcon = screen.getByTestId('deleteIcon');
        expect(deleteIcon).toBeInTheDocument();
        userEvent.click(deleteIcon);
        expect(mockDeleteFn).toHaveBeenCalled();
    });
});
