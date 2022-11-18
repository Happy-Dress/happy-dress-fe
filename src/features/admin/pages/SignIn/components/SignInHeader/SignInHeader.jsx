import React from 'react';
import SignInHeaderDesktop from './SignInHeaderDesktop';
import useSignInMediaQuery from '../../hooks/useSignInMediaQuery';


const SignInHeader = () => {

    const { isDesktopWidth, isMobileHeight } = useSignInMediaQuery();
    
    return(<>
        {isDesktopWidth && !isMobileHeight && <SignInHeaderDesktop/>}
    </>
    );
};

export default SignInHeader;