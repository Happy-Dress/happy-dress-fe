import React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ButtonAccent from './ButtonAccent';

describe('test ButtonAccent', () => {
    it('change class on click', () => {
        render(<ButtonAccent text='test'/>);
        const btn = screen.getByRole('button');
        expect(btn).toHaveClass('ButtonAccent');
        userEvent.click(btn);
        expect(btn).toHaveClass('ButtonAccent_active');
    });
});