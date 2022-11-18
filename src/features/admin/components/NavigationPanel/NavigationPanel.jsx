import React from 'react';
import NavigationPanelMobile from './NavigationPanelMobile/NavigationPanelMobile';
import NavigationPanelDesktop from './NavigationPanelDesktop/NavigationPanelDesktop';
import { useDeviceTypeContext } from '../../../../common/contexts/DeviceType';

const NavigationPanel = () => {
    const { isDesktop, isMobile } = useDeviceTypeContext();
    const setActive = ({ isActive }) => (isActive ? 'active' : '');
    return (
        <div>
            {isMobile && <NavigationPanelMobile setActive={setActive} />}
            {isDesktop && <NavigationPanelDesktop setActive={setActive} />}
        </div>
    );
};

export default NavigationPanel;