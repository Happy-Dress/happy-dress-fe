import React from 'react';
import HeaderDesktop from './HeaderDesktop';
import HeaderMobile from './HeaderMobile';
import { useDeviceTypeContext } from '../../../../common/contexts/DeviceType';

const Header = () => {

    const { isDesktop, isMobile } = useDeviceTypeContext();

    return (
        <>
            {isDesktop && <HeaderDesktop />}
            {isMobile && <HeaderMobile />}
        </>
    );
};

export default Header;
