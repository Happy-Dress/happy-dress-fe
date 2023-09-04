import Product from './index';
import mockAxios from 'jest-mock-axios';
import { mockCatalogueItemResponse } from '../../../../__mocks__/mockCatalogueItemResponse';
import renderWithStoreAndRouter from '../../../../common/util/tests/renderWithStoreAndRouter';

jest.mock('../../../../common/api',
    ()=>({
        getCatalogueItem: async () => mockCatalogueItemResponse,
    })
);

describe('Product', () => {

    afterEach(() => {
        mockAxios.reset();
    });

    beforeAll(() => {
        jest.useFakeTimers();
    });

    it('should render correctly', () => {
        const { baseElement } = renderWithStoreAndRouter(<Product/>);
        expect(baseElement).toBeInTheDocument();
    });
});