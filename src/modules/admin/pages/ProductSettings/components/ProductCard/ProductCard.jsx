
import adaptive from '../../../../../../common/ui/hocs/adaptive';
import ProductCardDesktop from './ProductCardDesktop/ProductCardDesktop';
import ProductCardMobile from './ProductCardMobile/ProductCardMobile';

export default adaptive(ProductCardDesktop, ProductCardMobile);