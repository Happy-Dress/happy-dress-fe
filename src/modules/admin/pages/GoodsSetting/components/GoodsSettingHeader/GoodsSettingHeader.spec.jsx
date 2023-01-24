import React from 'react';
import { screen, render, waitFor } from '@testing-library/react';
import GoodsSettingHeader from './GoodsSettingHeader';

jest.mock('./GoodsSettingHeaderDesktop', () => ({
    __esModule: true,
    default: () => <div>Goods Setting Header desktop</div>
}));

jest.mock('./GoodsSettingHeaderMobile', () => ({
    __esModule: true,
    default: () => <div>Goods Setting Header mobile</div>
}));

let mockIsMobileWidth = false;
let mockIsMobileHeight = false;
let mockIsDesktopWidth = false;

jest.mock('../../hooks/useGoodsMediaQuery', () => () => ({
    isMobileWidth: mockIsMobileWidth,
    isMobileHeight: mockIsMobileHeight,
    isDesktopWidth: mockIsDesktopWidth,
}));

describe('GoodsSettingHeader', () => {
    it('should render desktop goods setting component', async () => {
        mockIsDesktopWidth = true;
        mockIsMobileWidth = false;
        mockIsMobileHeight = false;

        render(<GoodsSettingHeader />);

        const desktopPanel = screen.getByText('Goods Setting Header desktop');

        await waitFor(() => {
            expect(desktopPanel).toBeInTheDocument();
        });
    });
    it('should render mobile goods setting component', async () => {
        mockIsMobileWidth = true;
        mockIsMobileHeight = true;
        mockIsDesktopWidth = false;

        render(<GoodsSettingHeader />);

        const mobilePanel = screen.getByText('Goods Setting Header mobile');

        await waitFor(() => {
            expect(mobilePanel).toBeInTheDocument();
        });
    });
});