import React from 'react';
import HeaderDesktop from './HeaderDesktop';
import { useDeviceTypeContext } from '../../../../../../common/contexts/DeviceType';


const Header = () => {
    
    const { isDesktop } = useDeviceTypeContext();
    
    return(<>
        {isDesktop && <HeaderDesktop/>}
    </>
    );
};

export default Header;