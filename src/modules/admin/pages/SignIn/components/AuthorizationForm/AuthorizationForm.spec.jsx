import { screen, render, waitFor } from '@testing-library/react';
import React from 'react';
import AuthorizationForm from './AuthorizationForm';

jest.mock('./AuthorizationFormDesktop', () => ({
    _esModule: true,
    default: () => <div>Authorization form desktop</div>
}));

jest.mock('./AuthorizationFormMobile', () => ({
    _esModule: true,
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

let mockOnSubmit = jest.fn();
let mockRegister = {};
let mockSetError = jest.fn();
let mockErrors = {};
let mockIsValid = false;
let mockIsPasswordVisible = false;
let mockTogglePasswordVisibility = jest.fn();

jest.mock('../../hooks/useAuthorizationForm', () => ({
    onSubmit: mockOnSubmit,
    register: mockRegister,
    setError: mockSetError,
    errors: mockErrors,
    isValid:mockIsValid,
    isPasswordVisible: mockIsPasswordVisible,
    togglePasswordVisibility: mockTogglePasswordVisibility,
}));


describe('AuthorizationForm', () => {
    it('should render desktop authorization form', async () => {
        mockIsDesktopWidth = true;

        render(<AuthorizationForm/>);
        const desktopPanel = screen.getByText('Authorization form desktop');
        await waitFor(() => {
            expect(desktopPanel).toBeInTheDocument();
        });
    });

    it('should render mobile authorization form', async () => {
        mockIsMobileWidth = true;
        render(<AuthorizationForm/>);
        const mobilePanel = screen.getByText('Authorization form mobile');
        await waitFor(() => {
            expect(mobilePanel).toBeInTheDocument();
        });
    });
});