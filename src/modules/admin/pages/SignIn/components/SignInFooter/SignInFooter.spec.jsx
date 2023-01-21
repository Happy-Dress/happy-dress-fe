import React from 'react';
import { screen, render, waitFor } from '@testing-library/react';
import SignInFooter from './SignInFooter';
import useSignInMediaQuery from '../../hooks/useSignInMediaQuery';

let mockIsDesktopWidth = true;
let mockIsMobileWidth = false;
let mockIsMobileHeight = false;

jest.mock('./../../hooks/useSignInMediaQuery');

describe('SignInFooter', () => {
    it('should render footer desktop', async () => {
        useSignInMediaQuery.mockImplementation(() => ({
            isDesktopWidth: mockIsDesktopWidth,
            isMobileWidth: mockIsMobileWidth,
            isMobileHeight: mockIsMobileHeight,
        }));
        render(<SignInFooter/>);
        const desktopPanel = screen.getByText('HAPPY DRESS');
        await waitFor(() => {
            expect(desktopPanel).toBeInTheDocument();
        });
    });
});