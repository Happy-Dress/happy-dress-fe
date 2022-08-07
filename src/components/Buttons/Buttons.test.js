import React from "react";
import '@testing-library/jest-dom';
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ButtonAccent from './ButtonAccent/ButtonAccent';
import ButtonDefault from './ButtonDefault/ButtonDefault';

test('test ButtonAccent', () => {
    render(<ButtonAccent/>);
    const btn = screen.queryByTestId('ButtonAccent');
    expect(btn).toHaveClass('ButtonAccent')
    userEvent.click(btn);
    expect(btn).toHaveClass('ButtonAccent_active')
})

test('test ButtonDefault', () => {
    render(<ButtonDefault/>);
    const btn = screen.queryByTestId('ButtonDefault');
    expect(btn).toHaveClass('ButtonDefault')
    userEvent.click(btn);
    expect(btn).toHaveClass('ButtonDefault_active')
})