import React from 'react';
import '@testing-library/jest-dom';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ButtonDefault from './ButtonDefault';

describe('ButtonDefault', () => {

    it('change class on click and remove after timeout', async () => {
        render(<ButtonDefault text='test'/>);
        const btn = screen.getByRole('button');
        expect(btn).toHaveClass('ButtonDefault');
        userEvent.click(btn);
        expect(btn).toHaveClass('ButtonDefault_active');
        await waitFor(() => {
            expect(btn).not.toHaveClass('ButtonDefault_active');
        });

    });
});
