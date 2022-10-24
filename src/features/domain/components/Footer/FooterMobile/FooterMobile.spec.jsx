import { render } from '@testing-library/react';
import React from 'react';
import HeaderMobile from './index';

describe('HeaderMobile', () => {
    it('should render correctly', async () => {
        const { baseElement } = render(<HeaderMobile />);
        expect(baseElement).toBeInTheDocument();
    });
});
