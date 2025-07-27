import React from 'react';
import { vi } from 'vitest';
import { render } from '@testing-library/react';
import DeleteProductConfirmationDialog from './DeleteProductConfirmationDialog';

describe('DeleteProductConfirmationDialog', () => {
    let mockOnClose;
    let mockHandleDeleteProduct;
    beforeEach(() => {
        mockOnClose = vi.fn();
        mockHandleDeleteProduct = vi.fn();
    });

    it('should render without errors', async () => {
        const { baseElement } = render(
            <DeleteProductConfirmationDialog
                onClose={mockOnClose}
                onSubmit={mockHandleDeleteProduct}
            />
        );
        expect(baseElement).toBeInTheDocument();
    });

});
