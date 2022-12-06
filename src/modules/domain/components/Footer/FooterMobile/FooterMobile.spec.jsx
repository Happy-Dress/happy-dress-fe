import { render } from '@testing-library/react';
import React from 'react';
import FooterMobile from './index';

describe('FooterMobile', () => {
    it('should render correctly', async () => {
        const { baseElement } = render(<FooterMobile />);
        expect(baseElement).toBeInTheDocument();
    });
});
