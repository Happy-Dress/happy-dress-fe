import { render } from '@testing-library/react';
import React from 'react';
import SignInHeaderDesktop from './SignInHeaderDesktop';

describe('SignInHeaderDesktop', () => {
    it('should render correctly', async () => {
        const { baseElement } = render(<SignInHeaderDesktop/>);
        expect(baseElement).toBeInTheDocument();
    });
});
