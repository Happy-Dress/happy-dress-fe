import { mockCatalogueItemsResponse } from '../../../../../../../../__mocks__/mockCatalogueItemsResponse';
import { render } from '@testing-library/react';
import CatalogContentDesktop from './CatalogContentDesktop';
import { mockGoodsSettingContext } from '../../../../../../../../__mocks__/mockGoodsSettingContext';

jest.mock('../../../../contexts/CatalogProvider/useCatalogContext', () => ({
    useCatalogContext: () => ({ ...mockGoodsSettingContext })
}));

describe('CatalogContentDesktop', () => {

    it('should render correct', () => {
        const { container } = render(<CatalogContentDesktop />);

        expect(container.getElementsByClassName('CatalogContentDesktop')[0]).toBeInTheDocument();
        expect(container.getElementsByClassName('ProductCardAdd')[0]).toBeInTheDocument();
        expect(container.getElementsByClassName('ProductCard').length).toBe(mockCatalogueItemsResponse.length);
        expect(container.getElementsByClassName('trash')[0]).toBe(undefined);
    });

    it('should render correct with selected items', () => {
        mockGoodsSettingContext.state.selectedItems = [1, 2];
        const { container } = render(<CatalogContentDesktop />);

        expect(container.getElementsByClassName('CatalogContentDesktop')[0]).toBeInTheDocument();
        expect(container.getElementsByClassName('ProductCardAdd')[0]).toBeInTheDocument();
        expect(container.getElementsByClassName('ProductCard').length).toBe(mockCatalogueItemsResponse.length);
        expect(container.getElementsByClassName('trash')[0]).toBeInTheDocument();

    });
});
