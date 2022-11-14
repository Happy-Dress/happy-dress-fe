import React from 'react';
import { useDeviceTypeContext } from '../../../../common/contexts/DeviceType';
import NavigationPanelDesktop from './NavigationPanelDesktop/NavigationPanelDesktop';
import NavigationPanelMobile from './NavigationPanelMobile/NavigationPanelMobile';



const NavigationPanel = () => {
    const { isDesktop, isMobile } = useDeviceTypeContext();
    return (
        <>
            {isMobile && <NavigationPanelMobile />}
            {isDesktop && <NavigationPanelDesktop />}
        </>
    );
};

export default NavigationPanel;