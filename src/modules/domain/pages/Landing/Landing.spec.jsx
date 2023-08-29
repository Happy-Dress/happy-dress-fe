import React from 'react';
import { Landing } from './index';
import { render } from '@testing-library/react';

describe('Landing', ( ) => {
    it('should render', async () => {
        const { baseElement } = render(<Landing/>);
        expect(baseElement).toBeInTheDocument();
    });
});