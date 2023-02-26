import adaptive from '../../../../../../common/ui/hocs/adaptive';
import ProductsSettingsSearchDesktop from './ProductSettingsSearchDesktop/ProductsSettingsSearchDesktop';
import ProductsSettingsSearchMobile from './ProductSettingsSerachMobile/ProductsSettingsSearchMobile';

const ProductsSettingsSearch = () =>{
    const AdaptiveSearch = adaptive(ProductsSettingsSearchDesktop, ProductsSettingsSearchMobile);
    return <AdaptiveSearch/>;
};

export default ProductsSettingsSearch;
