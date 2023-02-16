import { render } from '@testing-library/react';
import GoodsSettingContentMobile from './GoodsSettingContentMobile';
import { mockGoodsSettingContext } from '../../../../../../../../__mocks__/mockGoodsSettingContext';
import { mockCatalogueItemsResponse } from '../../../../../../../../__mocks__/mockCatalogueItemsResponse';

jest.mock('../../../../contexts/CatalogProvider/useCatalogContext', () => ({
    useCatalogContext: () => ({ ...mockGoodsSettingContext })
}));

describe('GoodsSettingContentMobile', () => {
    it('should render correct', () => {
        const { container } = render(<GoodsSettingContentMobile />);

        expect(container.getElementsByClassName('GoodsSettingContentMobile')[0]).toBeInTheDocument();
        expect(container.getElementsByClassName('ProductCardAdd')[0]).toBeInTheDocument();
        expect(container.getElementsByClassName('ProductCard').length).toBe(mockCatalogueItemsResponse.length);
        expect(container.getElementsByClassName('trash')[0]).toBe(undefined);
    });

    it('should render correct with selected items', () => {
        mockGoodsSettingContext.state.selectedItems = [1, 2];
        const { container } = render(<GoodsSettingContentMobile />);

        expect(container.getElementsByClassName('GoodsSettingContentMobile')[0]).toBeInTheDocument();
        expect(container.getElementsByClassName('ProductCardAdd')[0]).toBeInTheDocument();
        expect(container.getElementsByClassName('ProductCard').length).toBe(mockCatalogueItemsResponse.length);
        expect(container.getElementsByClassName('trash')[0]).toBeInTheDocument();

    });
});
