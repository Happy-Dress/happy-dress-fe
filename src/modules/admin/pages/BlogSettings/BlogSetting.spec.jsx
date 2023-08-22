import React from 'react';
import { render } from '@testing-library/react';
import BlogSettings from './BlogSettings';


describe('BlogSetting', () => {
    it('should render correctly', async () => {
        const { baseElement } = render(<BlogSettings />);
        expect(baseElement).toBeInTheDocument();
    });
});
