import ProductsSettingsSearchDesktop from './ProductsSettingsSearchDesktop';
import renderWithStore from '../../../../../../../common/util/tests/renderWithStore';

let baseElem;

describe('ProductSettingsSearchDesktop', () => {
    beforeEach(() => {
        baseElem = renderWithStore(<ProductsSettingsSearchDesktop/>).baseElement;
    });

    it('should render', () => {
        expect(baseElem).toBeInTheDocument();
    });
});