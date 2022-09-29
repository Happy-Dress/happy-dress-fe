import { render } from '@testing-library/react';
import React from 'react';
import HeaderDesktop from './HeaderDesktop';

describe('HeaderDesktop', () => {
    it('should render correctly', async () => {
        const { baseElement } = render(<HeaderDesktop />);
        expect(baseElement).toBeInTheDocument();
    });
});
