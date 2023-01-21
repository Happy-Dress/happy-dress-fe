import React from 'react';
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import Typography from './Typography';

describe('Typography', () => {
    it('render correctly', async () => {
        const { baseElement } = render(<Typography>Test</Typography>);
        expect(baseElement).toBeInTheDocument();
    });
});
