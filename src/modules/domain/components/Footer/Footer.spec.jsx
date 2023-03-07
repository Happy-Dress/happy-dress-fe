import React from 'react';
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import Footer from './Footer';
import { BrowserRouter } from 'react-router-dom';

describe('Footer', () => {
    it('should render correctly', async () => {
        const { baseElement } = render(<Footer />, { wrapper: BrowserRouter });
        expect(baseElement).toBeInTheDocument();
    });
});
