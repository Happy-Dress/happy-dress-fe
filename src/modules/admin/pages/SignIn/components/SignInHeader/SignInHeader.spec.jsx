import React from 'react';
import { vi } from 'vitest';
import { screen, render, waitFor } from '@testing-library/react';
import SignInHeader from './SignInHeader';
import useSignInMediaQuery from '../../hooks/useSignInMediaQuery';

let mockIsDesktopWidth = true;
let mockIsMobileWidth = false;
let mockIsMobileHeight = false;

vi.mock('../../hooks/useSignInMediaQuery');

describe('SignInHeader', () => {
    it('should render header desktop', async () => {
        useSignInMediaQuery.mockImplementation(() => ({
            isDesktopWidth: mockIsDesktopWidth,
            isMobileWidth: mockIsMobileWidth,
            isMobileHeight: mockIsMobileHeight,
        }));
        render(<SignInHeader/>);
        const desktopPanel = screen.getByText('HAPPYDRESS');
        await waitFor(() => {
            expect(desktopPanel).toBeInTheDocument();
        });
    });
});