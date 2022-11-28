import React from 'react';
import { screen, render, waitFor } from '@testing-library/react';
import SignInFooter from './AuthorizationFormDesktop';
import AuthorizationFormDesktop from './AuthorizationFormDesktop';

jest.mock('./AuthorizationFormDesktop', () => ({
    __esModule: true,
    default: () => <div>Authorization form desktop</div>
}));



describe('SignInFooter', () => {
    it('should render footer desktop', async () => {
        render(<AuthorizationFormDesktop/>);
        const desktopPanel = screen.getByText('Authorization form desktop');
        await waitFor(() => {
            expect(desktopPanel).toBeInTheDocument();
        });
    });
});