import React from 'react';
import FooterDesktop from './FooterDesktop';
import { useDeviceTypeContext } from '../../../../../../common/contexts/DeviceType';

const Footer = () => {
    const { isDesktop } = useDeviceTypeContext();
    return(<>
        {isDesktop && <FooterDesktop/>}
    </>
    );
};

export default Footer;