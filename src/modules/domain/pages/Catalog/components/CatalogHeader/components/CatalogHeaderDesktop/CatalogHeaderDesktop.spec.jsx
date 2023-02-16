import { render } from '@testing-library/react';
import CatalogHeaderDesktop from './CatalogHeaderDesktop';
import { mockGoodsSettingContext } from '../../../../../../../../__mocks__/mockGoodsSettingContext';
import { BrowserRouter } from 'react-router-dom';

jest.mock('../../../../contexts/CatalogProvider/useCatalogContext', () => ({
    useCatalogContext: () => ({ ...mockGoodsSettingContext })
}));

describe('CatalogHeaderDesktop', () => {
    it('should render correct', () => {
        const { container } = render(<CatalogHeaderDesktop />, { wrapper: BrowserRouter });

        expect(container.getElementsByClassName('CatalogHeaderDesktop')[0]).toBeInTheDocument();

    });

    it('should render filter badges', () => {
        mockGoodsSettingContext.state.currentFilters = {
            categories: [84],
            materials: [34, 4]
        };
        let { container } = render(<CatalogHeaderDesktop />, { wrapper: BrowserRouter });

        expect(container.getElementsByClassName('FilterBadge').length).toBe(2);
    });

    it('should not render filter badges', () => {
        mockGoodsSettingContext.state.currentFilters = {
            categories: [84],
        };
        const { container } = render(<CatalogHeaderDesktop />, { wrapper: BrowserRouter });

        expect(container.getElementsByClassName('FilterBadge').length).toBe(0);
    });
});
