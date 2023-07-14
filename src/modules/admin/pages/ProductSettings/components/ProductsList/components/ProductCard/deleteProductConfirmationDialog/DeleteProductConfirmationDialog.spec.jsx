
import React from 'react';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import DeleteProductConfirmationDialog from './DeleteProductConfirmationDialog';

describe('DeleteProductConfirmationDialog', () => {
    let mockOnClose;
    let mockHandleDeleteProduct;
    const CANCEL_BUTTON = 'Отмена';
    const SUBMIT_BUTTON = 'Удалить';
    beforeEach(() => {
        mockOnClose = jest.fn();
        mockHandleDeleteProduct = jest.fn();
    });

    it('should render without errors', async () => {
        render(
            <DeleteProductConfirmationDialog
                onClose={mockOnClose}
                handleDeleteProduct={mockHandleDeleteProduct}
            />
        );
        await waitFor(() => {
            expect(screen.getByTestId('confirm-delete')).toBeInTheDocument();
        });
    });

    it('should call onClose when Cancel button is clicked', async () => {
        render(
            <DeleteProductConfirmationDialog
                onClose={mockOnClose}
                handleDeleteProduct={mockHandleDeleteProduct}
            />
        );
        await waitFor(() => {
            fireEvent.click(screen.getByText('Отмена'));
            expect(mockOnClose).toHaveBeenCalled();
        });
    });

    it('should call handleDeleteProduct when Submit button is clicked', async () => {
        render(
            <DeleteProductConfirmationDialog
                onClose={mockOnClose}
                handleDeleteProduct={mockHandleDeleteProduct}
            />
        );
        await waitFor(() => {
            fireEvent.click(screen.getByText('Удалить'));
            expect(mockHandleDeleteProduct).toHaveBeenCalled();
        });
    });
});