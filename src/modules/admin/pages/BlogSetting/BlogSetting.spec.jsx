
import React from 'react';
import { render, screen } from '@testing-library/react';
import BlogSetting from './index';

jest.mock('./BlogSetting', () => ({
    __esModule: true,
    default: () => {
        return <div data-testid="blog-page"></div>;
    },
}));
describe('BlogSetting', () => {
    it('should render correctly', async () => {
        render(<BlogSetting />);
        const page = screen.getByTestId('blog-page');
        expect(page).toBeInTheDocument();
    });
});