import React from 'react';
import '@testing-library/jest-dom';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ButtonAccent from './ButtonAccent';

describe('ButtonAccent', () => {
    it('change class on click and remove after timeout', async () => {
        render(<ButtonAccent text='test' />);
        const btn = screen.getByRole('button');
        expect(btn).toHaveClass('ButtonAccent');
        userEvent.click(btn);
        expect(btn).toHaveClass('ButtonAccent_active');
        await waitFor(() =>{
            expect(btn).not.toHaveClass('ButtonAccent_active');
        });
    });
});
