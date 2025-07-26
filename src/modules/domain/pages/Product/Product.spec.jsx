import { vi } from 'vitest';
import Product from './index';
import { mockCatalogueItemResponse } from '../../../../__mocks__/mockCatalogueItemResponse';
import renderWithStoreAndRouter from '../../../../common/util/tests/renderWithStoreAndRouter';

vi.mock('../../../../common/api',
    ()=>({
        getCatalogueItem: async () => mockCatalogueItemResponse,
    })
);

describe('Product', () => {

    beforeAll(() => {
        vi.useFakeTimers();
    });

    it('should render correctly', () => {
        const { baseElement } = renderWithStoreAndRouter(<Product/>);
        expect(baseElement).toBeInTheDocument();
    });
});