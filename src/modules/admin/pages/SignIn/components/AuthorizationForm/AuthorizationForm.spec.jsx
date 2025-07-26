import React from 'react';
import { vi } from 'vitest';
import { screen, render, waitFor } from '@testing-library/react';
import AuthorizationForm from './AuthorizationForm';

vi.mock('./AuthorizationFormDesktop', () => ({
    __esModule: true,
    default: () => <div>Authorization form desktop</div>
}));

vi.mock('./AuthorizationFormMobile', () => ({
    __esModule: true,
    default: () => <div>Authorization form mobile</div>
}));

let mockIsMobileWidth = false;
let mockIsMobileHeight = false;
let mockIsDesktopWidth = false;


vi.mock('../../hooks/useSignInMediaQuery', () => {
    return {
        default: () => ({
            isMobileWidth: mockIsMobileWidth,
            isMobileHeight: mockIsMobileHeight,
            isDesktopWidth: mockIsDesktopWidth,
        })
    };
});


vi.mock('../../hooks/useAuthorizationForm', () => {
    return {
        default: () => ({
            onSubmit: vi.fn(),
            register: {},
            setError: vi.fn(),
            errors: {},
            isValid: false,
            isPasswordVisible: false,
            togglePasswordVisibility: vi.fn()
        })
    };
});



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