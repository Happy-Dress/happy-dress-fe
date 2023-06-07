import Product from './index';
import mockAxios from 'jest-mock-axios';
import { mockCatalogueItemResponse } from '../../../../__mocks__/mockCatalogueItemResponse';
import renderWithStore from '../../../../common/util/tests/renderWithStore';

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
        const { baseElement } = renderWithStore(<Product/>);
        expect(baseElement).toBeInTheDocument();
    });
});