
import adaptive from '../../../../../../common/ui/hocs/adaptive';
import ProductSettingCardDesktop from './ProductSettingCardDesktop/ProductSettingCardDesktop';
import ProductSettingCardMobile from './ProductSettingCardMobile/ProductSettingCardMobile';

export default adaptive(ProductSettingCardDesktop, ProductSettingCardMobile);