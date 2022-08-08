import React from "react";
import '@testing-library/jest-dom';
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ButtonDefault from './'

test('test ButtonDefault', () => {
    render(<ButtonDefault/>);
    const btn = screen.queryByTestId('ButtonDefault');
    expect(btn).toHaveClass('ButtonDefault');
    userEvent.click(btn);
    expect(btn).toHaveClass('ButtonDefault_active');
});