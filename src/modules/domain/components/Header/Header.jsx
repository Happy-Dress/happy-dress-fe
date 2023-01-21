import React from 'react';
import HeaderDesktop from './HeaderDesktop';
import HeaderMobile from './HeaderMobile';
import adaptive from '../../../../common/ui/hocs/adaptive';

const Header = () => {
    const AdaptiveHeader = adaptive(HeaderDesktop, HeaderMobile);
    return <AdaptiveHeader/>;
};

export default Header;
