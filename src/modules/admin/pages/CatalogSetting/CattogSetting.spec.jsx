import React from 'react';
import { render, screen } from '@testing-library/react';
import CatalogSetting from './index';

describe('CatalogSetting', () => {
    it('should render correctly', async () => {
        render(<CatalogSetting />);
        const page = screen.getByTestId('catalog-page');
        expect(page).toBeInTheDocument();
    });
});
