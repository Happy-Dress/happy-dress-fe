import { render } from '@testing-library/react';
import React from 'react';
import SignInFooterDesktop from './SignInFooterDesktop';

describe('SignInFooterDesktop', () => {
    it('should render correctly', async () => {
        const { baseElement } = render(<SignInFooterDesktop/>);
        expect(baseElement).toBeInTheDocument();
    });
});
