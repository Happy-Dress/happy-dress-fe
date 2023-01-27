import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import GoodsSetting from './index';

jest.mock('./components/GoodsSettingHeader', () => ({
    __esModule: true,
    default: () => {
        return <div data-testid="goods-setting-header"/>;
    }
}));

describe('GoodsSetting', () => {
    it('should render correctly', async () => {
        render(<GoodsSetting/>);

        const goodsSettingHeader = screen.getByTestId('goods-setting-header');

        await waitFor(() => {
            expect(goodsSettingHeader).toBeInTheDocument();
        });
    });
});