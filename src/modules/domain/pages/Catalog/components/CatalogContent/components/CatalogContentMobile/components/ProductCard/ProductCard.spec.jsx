import { render, screen } from '@testing-library/react';
import ProductCard from './ProductCard';
import { mockGoodsSettingContext } from '../../../../../../../../../../__mocks__/mockGoodsSettingContext';
import { mockCatalogueItemsResponse } from '../../../../../../../../../../__mocks__/mockCatalogueItemsResponse';

jest.mock('../../../../../../contexts/CatalogProvider/useCatalogContext', () => ({
    useCatalogContext: () => ({ ...mockGoodsSettingContext })
}));

describe('ProductCard', () => {
    it('should render correct', () => {
        render(<ProductCard product={mockCatalogueItemsResponse[0]}/>);

        expect(screen.getByText(mockCatalogueItemsResponse[0].name)).toBeInTheDocument();
    });
});
