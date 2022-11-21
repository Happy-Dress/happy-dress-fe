import React from 'react';
import { render } from '@testing-library/react';
import BlogSetting from './index';

describe('BlogSetting', () => {
    it('should render correctly', async () => {
        const { baseElement } = render(<BlogSetting />);
        expect(baseElement).toBeInTheDocument();
    });
});