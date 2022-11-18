import React from 'react';
import HeaderDesktop from './HeaderDesktop';
import { useMediaQuery } from 'react-responsive';


const Header = () => {

    const DESKTOP_MIN_SCREEN_SIZE = '767px';
    const isDesktop = useMediaQuery({ query: `(min-width: ${DESKTOP_MIN_SCREEN_SIZE})` });
    
    return(<>
        {isDesktop && <HeaderDesktop/>}
    </>
    );
};

export default Header;