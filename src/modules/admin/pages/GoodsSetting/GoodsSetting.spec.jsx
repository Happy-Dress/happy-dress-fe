import React from 'react';
import { render } from '@testing-library/react';
import GoodsSetting from './index';

describe('GoodsSetting', () => {
    it('should render correctly', async () => {
        const { baseElement } = render(<GoodsSetting />);
        expect(baseElement).toBeInTheDocument();
    });
});
