import ProductsSettingsSearchDesktop from './ProductsSettingsSearchDesktop';
import renderWithStoreAndRoutes from '../../../../../../../common/util/tests/renderWithStoreAndRouter';

let baseElem;

describe('ProductSettingsSearchDesktop', () => {
    beforeEach(() => {
        baseElem = renderWithStoreAndRoutes(<ProductsSettingsSearchDesktop/>).baseElement;
    });

    it('should render', () => {
        expect(baseElem).toBeInTheDocument();
    });
});