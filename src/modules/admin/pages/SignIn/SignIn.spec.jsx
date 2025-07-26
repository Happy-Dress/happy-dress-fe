import React from 'react';
import { vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import SignIn from './SignIn';

vi.mock('./components/AuthorizationForm', ()=>({
    __esModule: true,
    default: ()=>{
        return <div data-testid="authorization-form"/>;
    }
}));

vi.mock('./components/SignInHeader', ()=>({
    __esModule: true,
    default: ()=>{
        return <div data-testid="sign-in-header"/>;
    }
}));

vi.mock('./components/SignInFooter', ()=>({
    __esModule: true,
    default: ()=>{
        return <div data-testid="sign-in-footer"/>;
    }
}));

describe('SignIn', () => {
    it('should render sign in page', async () => {
        render(<SignIn/>);
        const signInHeader = screen.getByTestId('sign-in-header');
        const authorizationForm = screen.getByTestId('authorization-form');
        const signInFooter = screen.getByTestId('sign-in-footer');
        await waitFor(() => {
            expect(signInHeader).toBeInTheDocument();
        });
        await waitFor(() => {
            expect(authorizationForm).toBeInTheDocument();
        });
        await waitFor(() => {
            expect(signInFooter).toBeInTheDocument();
        });
    });
});