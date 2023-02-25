import { act, render, screen } from '@testing-library/react';
import ProductCard from './ProductCard';
import { mockCatalogueItemsResponse } from '../../../../../../../../../../__mocks__/mockCatalogueItemsResponse';
import userEvent from '@testing-library/user-event';
import { mockGoodsSettingContext } from '../../../../../../../../../../__mocks__/mockGoodsSettingContext';

jest.mock('../../../../../../contexts/CatalogProvider/useCatalogContext', () => ({
    useCatalogContext: () => ({ ...mockGoodsSettingContext })
}));

describe('ProductCard', () => {
    it('should render correct', () => {
        render(<ProductCard product={mockCatalogueItemsResponse[0]}/>);

        expect(screen.getByText(mockCatalogueItemsResponse[0].name)).toBeInTheDocument();
    });

    it('should change on hover item', async () => {
        const { container } = render(<ProductCard product={mockCatalogueItemsResponse[0]}/>);

        expect(container.getElementsByClassName('checkbox')[0]).toBe(undefined);

        await act(() => {
            userEvent.hover(container.getElementsByClassName('ProductCard')[0]);
        });

        expect(container.getElementsByClassName('empty')[0]).toBeInTheDocument();
    });

    test('click item', async () => {
        const { container } = render(<ProductCard product={mockCatalogueItemsResponse[0]}/>);

        expect(container.getElementsByClassName('checkbox')[0]).toBe(undefined);

        await act(() => {
            userEvent.hover(container.getElementsByClassName('ProductCard')[0]);
            userEvent.click(container.getElementsByClassName('ProductCard')[0]);
        });

        expect(container.getElementsByClassName('filled')[0]).toBeInTheDocument();
    });
});
