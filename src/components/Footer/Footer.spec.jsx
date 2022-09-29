import React from 'react';
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import Header from './Header';

describe('Header', () => {
    it('should render correctly', async () => {
        const { baseElement } = render(<Footer />);
        expect(baseElement).toBeInTheDocument();
    });
});
