import React from 'react';
import { render } from '@testing-library/react';
import CatalogSetting from './index';

describe('CatalogSetting', () => {
    it('should render correctly', async () => {
        const { baseElement } = render(<CatalogSetting />);
        expect(baseElement).toBeInTheDocument();
    });
});
