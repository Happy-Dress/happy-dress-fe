import React from 'react';
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import Header from './Header';
import { BrowserRouter } from 'react-router-dom';

describe('Header', () => {
    it('should render correctly', async () => {
        const { baseElement } = render(<Header />, { wrapper: BrowserRouter });
        expect(baseElement).toBeInTheDocument();
    });
});
