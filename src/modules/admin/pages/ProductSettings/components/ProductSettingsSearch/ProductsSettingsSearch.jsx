import adaptive from '../../../../../../common/ui/hocs/adaptive';
import ProductsSettingsSearchDesktop from './ProductSettingsSearchDesktop/ProductsSettingsSearchDesktop';
import ProductsSettingsSearchMobile from './ProductSettingsSearchMobile/ProductsSettingsSearchMobile';

export default adaptive(ProductsSettingsSearchDesktop, ProductsSettingsSearchMobile);
