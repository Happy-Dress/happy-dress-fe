import React from 'react';
import { useDeviceTypeContext } from '../../../../common/contexts/DeviceType';
import CatalogSettingModalMobile from '../CatalogSettingModalMobile/CatalogSettingModalMobile';
import CatalogSettingModalDesktop from '../CatalogSettingModalDesktop.jsx/CatalogSettingModalDesktop';
const CatalogSettingModal = () => {
    const { isDesktop, isMobile } = useDeviceTypeContext();

    return (
        <div>
            {isMobile && <CatalogSettingModalMobile/>}
            {isDesktop && <CatalogSettingModalDesktop/>}
        </div>
      
    );
};

export default CatalogSettingModal;