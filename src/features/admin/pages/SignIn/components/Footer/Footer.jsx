import React from 'react';
import FooterDesktop from './FooterDesktop';
import { useDeviceTypeContext } from '../../../../../../common/contexts/DeviceType';
import { useMediaQuery } from 'react-responsive';

const Footer = () => {
    const DESKTOP_MIN_SCREEN_SIZE = '426px';
    const isDesktop = useMediaQuery({ query: `(min-width: ${DESKTOP_MIN_SCREEN_SIZE})` });
    return(<>
        {isDesktop && <FooterDesktop/>}
    </>
    );
};

export default Footer;