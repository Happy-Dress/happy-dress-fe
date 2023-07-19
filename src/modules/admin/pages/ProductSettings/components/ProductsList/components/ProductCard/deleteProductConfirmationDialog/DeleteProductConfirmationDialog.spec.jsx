import React from 'react';
import { render } from '@testing-library/react';
import DeleteProductConfirmationDialog from './DeleteProductConfirmationDialog';

describe('DeleteProductConfirmationDialog', () => {
    let mockOnClose;
    let mockHandleDeleteProduct;
    beforeEach(() => {
        mockOnClose = jest.fn();
        mockHandleDeleteProduct = jest.fn();
    });

    it('should render without errors', async () => {
        const { baseElement } = render(
            <DeleteProductConfirmationDialog
                onClose={mockOnClose}
                handleDeleteProduct={mockHandleDeleteProduct}
            />
        );
        expect(baseElement).toBeInTheDocument();
    });

});
