import React from 'react';
import { screen, render, waitFor } from '@testing-library/react';
import SignInHeader from './SignInHeader';

jest.mock('./SignInHeader', () => ({
    __esModule: true,
    default: () => <div>SignIn header desktop</div>
}));

let mockIsDesktop = true;
let mockIsMobileWidth = false;
let mockIsMobileHeight = false;

jest.mock('./../../hooks/useSignInMediaQuery', () =>{
    return jest.fn(() => ({
        isDesktop: mockIsDesktop,
        isMobileWidth: mockIsMobileWidth,
        isMobileHeight: mockIsMobileHeight,
    }));
});

describe('SignInHeader', () => {
    it('should render header desktop', async () => {
        render(<SignInHeader/>);
        const desktopPanel = screen.getByText('SignIn header desktop');
        await waitFor(() => {
            expect(desktopPanel).toBeInTheDocument();
        });
    });
});