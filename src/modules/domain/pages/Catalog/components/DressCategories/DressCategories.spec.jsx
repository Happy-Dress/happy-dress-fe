import { render, screen } from '@testing-library/react';
import DressCategories from './DressCategories';
import { mockGoodsSettingContext } from '../../../../../../__mocks__/mockGoodsSettingContext';

jest.mock('../../contexts/CatalogProvider/useCatalogContext', () => ({
    useCatalogContext: () => ({ ...mockGoodsSettingContext })
}));

describe('DressCategories', () => {
    it('should render', () => {
        mockGoodsSettingContext.state.currentFilters.categories = [84];
        const { container } = render(<DressCategories />);

        expect(container.getElementsByClassName('DressCategories')[0]).toBeInTheDocument();
        expect(screen.getByText('Свадебные')).toHaveClass('active');
    });
    it('should render loader', () => {
        mockGoodsSettingContext.state.loading.header = true;
        const { container } = render(<DressCategories />);

        expect(container.getElementsByClassName('DressCategories')[0]).toBe(undefined);
    });
});
