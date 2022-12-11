import { render, screen, waitFor } from '@testing-library/react';
import React from 'react';
import SignIn from './SignIn';

jest.mock('./components/AuthorizationForm', ()=>({
    __esModule: true,
    default: ()=>{
        return <div data-testid="authorization-form"/>;
    }
}));

jest.mock('./components/SignInHeader', ()=>({
    __esModule: true,
    default: ()=>{
        return <div data-testid="sign-in-header"/>;
    }
}));

jest.mock('./components/SignInFooter', ()=>({
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