import adaptive from '../../../../../../../../common/ui/hocs/adaptive';
import ProductDesktop from './ProductDesktop';
import ProductMobile from './ProductMobile/ProductMobile';

export default adaptive(ProductDesktop, ProductMobile);