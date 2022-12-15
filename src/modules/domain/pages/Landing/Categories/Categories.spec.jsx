import { render } from '@testing-library/react';
import React from 'react';
import Categories from './Categories';

describe('Categories', () => {
    it('should render correctly', async () => {
        const { baseElement } = render(<Categories />);
        expect(baseElement).toBeInTheDocument();
    });
});