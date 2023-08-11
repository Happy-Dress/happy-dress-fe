import React from 'react';
import { useDeviceTypeContext } from '../contexts/DeviceType';

const adaptive = (DesktopComponent, MobileComponent) => (props) => {
    const { isDesktop, isMobile } = useDeviceTypeContext();

    return (
        <>
            {isDesktop && <DesktopComponent { ...props } />}
            {isMobile && <MobileComponent { ...props } />}
        </>
    );
};

export default adaptive;
