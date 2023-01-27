import React from 'react';
import { screen, render, waitFor } from '@testing-library/react';
import AuthorizationForm from './AuthorizationForm';

jest.mock('./AuthorizationFormDesktop', () => ({
    __esModule: true,
    default: () => <div>Authorization form desktop</div>
}));

jest.mock('./AuthorizationFormMobile', () => ({
    __esModule: true,
    default: () => <div>Authorization form mobile</div>
}));

let mockIsMobileWidth = false;
let mockIsMobileHeight = false;
let mockIsDesktopWidth = false;

jest.mock('../../hooks/useSignInMediaQuery', () => () => ({
    isMobileWidth: mockIsMobileWidth,
    isMobileHeight: mockIsMobileHeight,
    isDesktopWidth: mockIsDesktopWidth,
}));

jest.mock('../../hooks/useAuthorizationForm', () => () => ({
    onSubmit: jest.fn(),
    register: {},
    setError: jest.fn(),
    errors: {},
    isValid: false,
    isPasswordVisible: false,
    togglePasswordVisibility: jest.fn(),
}));


describe('AuthorizationForm', () => {
    it('should render desktop authorization form', async () => {
        mockIsDesktopWidth = true;
        mockIsMobileWidth = false;
        mockIsMobileHeight = false;
        render(<AuthorizationForm/>);
        const desktopPanel = screen.getByText('Authorization form desktop');
        await waitFor(() => {
            expect(desktopPanel).toBeInTheDocument();
        });
    });

    it('should render mobile authorization form', async () => {
        mockIsMobileWidth = true;
        mockIsMobileHeight = true;
        mockIsDesktopWidth = false;
        render(<AuthorizationForm/>);
        const mobilePanel = screen.getByText('Authorization form mobile');
        await waitFor(() => {
            expect(mobilePanel).toBeInTheDocument();
        });
    });
});