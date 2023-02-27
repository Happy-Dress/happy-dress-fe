import adaptive from '../../../../../../common/ui/hocs/adaptive';
import ProductsSettingsSearchDesktop from './ProductSettingsSearchDesktop/ProductsSettingsSearchDesktop';
import ProductsSettingsSearchMobile from './ProductSettingsSerachMobile/ProductsSettingsSearchMobile';

export default adaptive(ProductsSettingsSearchDesktop, ProductsSettingsSearchMobile);
