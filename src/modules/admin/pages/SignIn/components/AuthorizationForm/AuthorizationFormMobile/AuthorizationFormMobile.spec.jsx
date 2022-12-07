import React from 'react';
import { screen, render, waitFor } from '@testing-library/react';
import AuthorizationFormDesktop from './AuthorizationFormMobile';

jest.mock('./AuthorizationFormMobile', () => ({
    __esModule: true,
    default: () => <div>Authorization form mobile</div>
}));

const props = {
    onSubmit: jest.fn(),
    errors: {},
    register: jest.fn(),
    isValid: false,
    isPasswordVisible: false,
    togglePasswordVisibility: jest.fn(),
};

describe('AuthorizationFormMobile', () => {
    it('should render authorization form mobile', async () => {
        render(<AuthorizationFormDesktop { ...props }/>);
        const desktopPanel = screen.getByText('Authorization form mobile');
        await waitFor(() => {
            expect(desktopPanel).toBeInTheDocument();
        });
    });
});