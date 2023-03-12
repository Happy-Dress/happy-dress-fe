import { render } from '@testing-library/react';
import React from 'react';
import ZeroBLock from './index';
import { BrowserRouter } from 'react-router-dom';

describe('ZeroBlock', () => {
    it('should render correctly', async () => {
        const { baseElement } = render(<ZeroBLock/>, { wrapper: BrowserRouter });
        expect(baseElement).toBeInTheDocument();
    });
});
