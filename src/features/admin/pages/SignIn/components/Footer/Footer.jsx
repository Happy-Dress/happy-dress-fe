import React from 'react';
import FooterDesktop from './FooterDesktop';
import { useMediaQuery } from 'react-responsive';

const Footer = () => {
    const DESKTOP_MIN_SCREEN_SIZE = '767px';
    const isDesktop = useMediaQuery({ query: `(min-width: ${DESKTOP_MIN_SCREEN_SIZE})` });
    return(<>
        {isDesktop && <FooterDesktop/>}
    </>
    );
};

export default Footer;