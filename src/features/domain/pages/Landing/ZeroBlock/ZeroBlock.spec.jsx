import { render } from '@testing-library/react';
import React from 'react';
import ZeroBLock from './index';

describe('ZeroBlock', () => {
    it('should render correctly', async () => {
        const { baseElement } = render(<ZeroBLock/>);
        expect(baseElement).toBeInTheDocument();
    });
});
