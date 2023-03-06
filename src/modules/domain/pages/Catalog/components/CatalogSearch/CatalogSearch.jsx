import adaptive from '../../../../../../common/ui/hocs/adaptive';
import CatalogSearchDesktop from './CatalogSearchDesktop/CatalogSearchDesktop';
import CatalogSearchMobile from './CatalogSearchMobile/CatalogSearchMobile';

export default adaptive(CatalogSearchDesktop, CatalogSearchMobile);
