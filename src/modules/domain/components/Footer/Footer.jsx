import React from 'react';
import FooterDesktop from './FooterDesktop/FooterDesktop';
import FooterMobile from './FooterMobile/FooterMobile';
import adaptive from '../../../../common/ui/hocs/adaptive';

const Footer = () => {
    const AdaptiveFooter = adaptive(FooterDesktop, FooterMobile);
    return <AdaptiveFooter/>;
};

export default Footer;
