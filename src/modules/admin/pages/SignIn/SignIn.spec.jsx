import { render, screen, waitFor } from '@testing-library/react';
import React from 'react';
import SignIn from './SignIn';

jest.mock('./SignIn', ()=>({
    __esModule: true,
    default: ()=>{
        return <div data-testid="sign-in-page"/>;
    }
}));

describe('SignIn', () => {
    it('should render sign in page', async () => {
        render(<SignIn/>);
        const signIn = screen.getByTestId('sign-in-page');
        await waitFor(() => {
            expect(signIn).toBeInTheDocument();
        });
    });
});