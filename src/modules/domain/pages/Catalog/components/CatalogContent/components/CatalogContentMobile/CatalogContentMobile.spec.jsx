import { render } from '@testing-library/react';
import CatalogContentMobile from './CatalogContentMobile';
import { mockGoodsSettingContext } from '../../../../../../../../__mocks__/mockGoodsSettingContext';
import { mockCatalogueItemsResponse } from '../../../../../../../../__mocks__/mockCatalogueItemsResponse';

jest.mock('../../../../contexts/CatalogProvider/useCatalogContext', () => ({
    useCatalogContext: () => ({ ...mockGoodsSettingContext })
}));

describe('CatalogContentMobile', () => {
    it('should render correct', () => {
        const { container } = render(<CatalogContentMobile />);

        expect(container.getElementsByClassName('CatalogContentMobile')[0]).toBeInTheDocument();
        expect(container.getElementsByClassName('ProductCard').length).toBe(mockCatalogueItemsResponse.length);
    });

    it('should render correct with selected items', () => {
        const { container } = render(<CatalogContentMobile />);

        expect(container.getElementsByClassName('CatalogContentMobile')[0]).toBeInTheDocument();
        expect(container.getElementsByClassName('ProductCard').length).toBe(mockCatalogueItemsResponse.length);

    });
});
