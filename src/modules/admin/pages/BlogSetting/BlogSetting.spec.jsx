import React from 'react';
import { render, screen } from '@testing-library/react';
import BlogSetting from './index';

describe('BlogSetting', () => {
    it('should render correctly', async () => {
        render(<BlogSetting />);
        const page = screen.getByTestId('blog-page');
        expect(page).toBeInTheDocument();
    });
});