import React from 'react';
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import Footer from './Footer';

describe('Footer', () => {
    it('should render correctly', async () => {
        const { baseElement } = render(<Footer />);
        expect(baseElement).toBeInTheDocument();
    });
});
