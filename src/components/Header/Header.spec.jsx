import React from 'react';
import '@testing-library/jest-dom';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Header from './Header';

describe('Header', () => {
    it('change class on click and remove after timeout', async () => {
        render(<Header text='test' />);
        const btn = screen.getByRole('button');
        expect(btn).toHaveClass('Header');
        userEvent.click(btn);
        expect(btn).toHaveClass('Header');
        await waitFor(() =>{
            expect(btn).not.toHaveClass('Header');
        });
    });
});
