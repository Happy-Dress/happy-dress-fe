import { render } from '@testing-library/react';
import Filters from './Filters';
import { mockGoodsSettingContext } from '../../../../../../../../../../__mocks__/mockGoodsSettingContext';

jest.mock('../../../../../../contexts/CatalogProvider/useCatalogContext', () => ({
    useCatalogContext: () => ({ ...mockGoodsSettingContext })
}));

describe('Filters', () => {
    it('', () => {
        const { container } = render(<Filters />);

        expect(container.getElementsByClassName('Filters')[0]).toBeInTheDocument();
        expect(container.getElementsByClassName('DropdownSelectList').length)
            .toBe(Object.keys(mockGoodsSettingContext.state.filters).length - 1); // -1 т.к. фильтр по категориям не выводится
    });
});
