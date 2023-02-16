import { render } from '@testing-library/react';
import GoodsSettingHeaderDesktop from './GoodsSettingHeaderDesktop';
import { mockGoodsSettingContext } from '../../../../../../../../__mocks__/mockGoodsSettingContext';
import { BrowserRouter } from 'react-router-dom';

jest.mock('../../../../contexts/CatalogProvider/useCatalogContext', () => ({
    useCatalogContext: () => ({ ...mockGoodsSettingContext })
}));

describe('GoodsSettingHeaderDesktop', () => {
    it('should render correct', () => {
        const { container } = render(<GoodsSettingHeaderDesktop />, { wrapper: BrowserRouter });

        expect(container.getElementsByClassName('GoodsSettingHeaderDesktop')[0]).toBeInTheDocument();
        expect(container.getElementsByClassName('DressCategories')[0]).toBeInTheDocument();

    });

    it('should render filter badges', () => {
        mockGoodsSettingContext.state.currentFilters = {
            categories: [84],
            materials: [34, 4]
        };
        let { container } = render(<GoodsSettingHeaderDesktop />, { wrapper: BrowserRouter });

        expect(container.getElementsByClassName('FilterBadge').length).toBe(2);
    });

    it('should not render filter badges', () => {
        mockGoodsSettingContext.state.currentFilters = {
            categories: [84],
        };
        const { container } = render(<GoodsSettingHeaderDesktop />, { wrapper: BrowserRouter });

        expect(container.getElementsByClassName('FilterBadge').length).toBe(0);
    });
});
