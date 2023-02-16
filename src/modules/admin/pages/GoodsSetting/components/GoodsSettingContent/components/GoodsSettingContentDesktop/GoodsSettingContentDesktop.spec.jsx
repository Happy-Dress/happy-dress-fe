import { mockCatalogueItemsResponse } from '../../../../../../../../__mocks__/mockCatalogueItemsResponse';
import { render } from '@testing-library/react';
import GoodsSettingContentDesktop from './GoodsSettingContentDesktop';
import { mockGoodsSettingContext } from '../../../../../../../../__mocks__/mockGoodsSettingContext';

jest.mock('../../../../contexts/CatalogProvider/useCatalogContext', () => ({
    useCatalogContext: () => ({ ...mockGoodsSettingContext })
}));

describe('GoodsSettingContentDesktop', () => {

    it('should render correct', () => {
        const { container } = render(<GoodsSettingContentDesktop />);

        expect(container.getElementsByClassName('GoodsSettingContentDesktop')[0]).toBeInTheDocument();
        expect(container.getElementsByClassName('ProductCardAdd')[0]).toBeInTheDocument();
        expect(container.getElementsByClassName('ProductCard').length).toBe(mockCatalogueItemsResponse.length);
        expect(container.getElementsByClassName('trash')[0]).toBe(undefined);
    });

    it('should render correct with selected items', () => {
        mockGoodsSettingContext.state.selectedItems = [1, 2];
        const { container } = render(<GoodsSettingContentDesktop />);

        expect(container.getElementsByClassName('GoodsSettingContentDesktop')[0]).toBeInTheDocument();
        expect(container.getElementsByClassName('ProductCardAdd')[0]).toBeInTheDocument();
        expect(container.getElementsByClassName('ProductCard').length).toBe(mockCatalogueItemsResponse.length);
        expect(container.getElementsByClassName('trash')[0]).toBeInTheDocument();

    });
});
