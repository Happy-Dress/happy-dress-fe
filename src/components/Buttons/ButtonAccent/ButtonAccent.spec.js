import React from "react";
import '@testing-library/jest-dom';
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ButtonAccent from './';

test('test ButtonAccent', () => {
    render(<ButtonAccent/>);
    const btn = screen.queryByTestId('ButtonAccent');
    expect(btn).toHaveClass('ButtonAccent');
    userEvent.click(btn);
    expect(btn).toHaveClass('ButtonAccent_active');
});
