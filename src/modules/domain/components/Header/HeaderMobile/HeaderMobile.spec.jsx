import { render } from '@testing-library/react';
import React from 'react';
import HeaderMobile from './index';
import { BrowserRouter } from 'react-router-dom';

describe('HeaderMobile', () => {
    it('should render correctly', async () => {
        const { baseElement } = render(<HeaderMobile />, { wrapper: BrowserRouter });
        expect(baseElement).toBeInTheDocument();
    });
});
