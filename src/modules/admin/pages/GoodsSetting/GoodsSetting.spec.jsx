import React from 'react';
import { render, screen } from '@testing-library/react';
import GoodsSetting from './index';

describe('GoodsSetting', () => {
    it('should render correctly', async () => {
        render(<GoodsSetting />);
        const page = screen.getByTestId('goods-page');
        expect(page).toBeInTheDocument();
    });
});
