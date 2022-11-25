import { screen, render, waitFor } from '@testing-library/react';
import React from 'react';
import AuthorizationForm from './AuthorizationForm';
import useSignInMediaQuery from '../../hooks/useSignInMediaQuery';

jest.mock('./AuthorizationFormDesktop', () => ({
    _esModule: true,
    default: () => <div>Authorization form desktop</div>
}));

jest.mock('./AuthorizationFormMobile', () => ({
    _esModule: true,
    default: () => <div>Authorization form mobile</div>
}));

jest.mock('./../../hooks/useSignInMediaQuery', () =>({
    useSignInMediaQuery: jest.fn()
}));



describe('AuthorizationForm', () => {
    it('should render desktop authorization form', async () => {
        useSignInMediaQuery.mockImplementation(() => ({
            isDesktop: true
        }));
        render(<AuthorizationForm/>);
        const desktopPanel = screen.getByText('Authorization form desktop');
        await waitFor(() => {
            expect(desktopPanel).toBeInTheDocument();
        });
    });

    it('should render mobile authorization form', async () => {
        useSignInMediaQuery.mockImplementation(() => ({
            isDesktop: true
        }));
        render(<AuthorizationForm/>);
        const mobilePanel = screen.getByText('Authorization form mobile');
        await waitFor(() => {
            expect(mobilePanel).toBeInTheDocument();
        });
    });
});
