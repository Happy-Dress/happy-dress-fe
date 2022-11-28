import React from 'react';
import { screen, render, waitFor } from '@testing-library/react';
import SignInFooter from './SignInFooter';

jest.mock('./SignInFooter', () => ({
    __esModule: true,
    default: () => <div>SignIn footer desktop</div>
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

describe('SignInFooter', () => {
    it('should render footer desktop', async () => {
        render(<SignInFooter/>);
        const desktopPanel = screen.getByText('SignIn footer desktop');
        await waitFor(() => {
            expect(desktopPanel).toBeInTheDocument();
        });
    });
});