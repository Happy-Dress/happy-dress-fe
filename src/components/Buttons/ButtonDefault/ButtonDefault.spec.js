import React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ButtonDefault from './ButtonDefault';

describe('test ButtonDefault', () => {
    it('change class on click', () => {
        render(<ButtonDefault text='test'/>);
        const btn = screen.getByRole('button');
        expect(btn).toHaveClass('ButtonDefault');
        userEvent.click(btn);
        expect(btn).toHaveClass('ButtonDefault_active');
    });
});