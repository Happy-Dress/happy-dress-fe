import { render } from '@testing-library/react';
import React from 'react';
import HeaderDesktop from './HeaderDesktop';
import { BrowserRouter } from 'react-router-dom';

describe('HeaderDesktop', () => {
    it('should render correctly', async () => {
        const { baseElement } = render(<HeaderDesktop />, { wrapper: BrowserRouter });
        expect(baseElement).toBeInTheDocument();
    });
});
