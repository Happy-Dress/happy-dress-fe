import React from 'react';
import NavigationPanelMobile from '../NavigationPanelMobile/NavigationPanelMobile';
import NavigationPanelDesktop from '../NavigationPanelDesktop/NavigationPanelDesktop';
import { useDeviceTypeContext } from '../../../../common/contexts/DeviceType';

const NavigationPanel = () => {
    const { isDesktop, isMobile } = useDeviceTypeContext();
    return (
        <div>
            {isMobile && <NavigationPanelMobile/>}
            {isDesktop && <NavigationPanelDesktop/>}
        </div>
    );
};

export default NavigationPanel;