import React from 'react';
import '@testing-library/jest-dom';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ButtonDefault from './ButtonDefault';
import styles from './ButtonDefault.module.scss';


describe('ButtonDefault', () => {

    it('change class on click and remove after timeout', async () => {
        render(<ButtonDefault text='test'/>);
        const btn = screen.getByRole('button');
        expect(btn).toHaveClass(styles.ButtonDefault);
        userEvent.click(btn);
        expect(btn).toHaveClass(styles.ButtonDefault_active);
        await waitFor(() => {
            expect(btn).not.toHaveClass(styles.ButtonDefault_active);
        });

    });
});
