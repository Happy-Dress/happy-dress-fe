import { render } from '@testing-library/react';
import React from 'react';
import FooterMobile from './index';
import { BrowserRouter } from 'react-router-dom';

describe('FooterMobile', () => {
    it('should render correctly', async () => {
        const { baseElement } = render(<FooterMobile />, { wrapper: BrowserRouter });
        expect(baseElement).toBeInTheDocument();
    });
});
