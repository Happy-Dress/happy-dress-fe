import { act, render, screen } from '@testing-library/react';
import ProductCard from './ProductCard';
import { mockGoodsSettingContext } from '../../../../../../../../../../__mocks__/mockGoodsSettingContext';
import { mockCatalogueItemsResponse } from '../../../../../../../../../../__mocks__/mockCatalogueItemsResponse';
import userEvent from '@testing-library/user-event';

jest.mock('../../../../../../contexts/CatalogProvider/useCatalogContext', () => ({
    useCatalogContext: () => ({ ...mockGoodsSettingContext })
}));

describe('ProductCard', () => {
    it('should render correct', () => {
        render(<ProductCard product={mockCatalogueItemsResponse[0]}/>);

        expect(screen.getByText(mockCatalogueItemsResponse[0].name)).toBeInTheDocument();
    });

    it('should change on click item', async () => {
        const { container } = render(<ProductCard product={mockCatalogueItemsResponse[0]}/>);

        expect(container.getElementsByClassName('checkbox')[0]).toBe(undefined);


        await act(() => {
            userEvent.click(container.getElementsByClassName('ProductCard')[0]);
        });

        expect(container.getElementsByClassName('checkbox')[0]).toBeInTheDocument();

        await act(() => {
            userEvent.click(container.getElementsByClassName('ProductCard')[0]);
        });

        expect(container.getElementsByClassName('checkbox')[0]).toBe(undefined);
    });
});
