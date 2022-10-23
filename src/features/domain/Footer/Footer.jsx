import React from 'react';
import FooterDesktop from './FooterDesktop/FooterDesktop';
import FooterMobile from './FooterMobile/FooterMobile';
import { useDeviceTypeContext } from '../../../common/contexts/DeviceType';

const Footer = () => {

    const {isDesktop, isMobile} = useDeviceTypeContext();

    return (
        <>
            {isDesktop && <FooterDesktop />}
            {isMobile &&  <FooterMobile />}
        </>
    );
};

export default Footer;
