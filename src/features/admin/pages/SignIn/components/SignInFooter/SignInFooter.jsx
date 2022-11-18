import React from 'react';
import SignInFooterDesktop from './SignInFooterDesktop';
import useSignInMediaQuery from '../../hooks/useSignInMediaQuery';

const SignInFooter = () => {
    const { isDesktopWidth, isMobileHeight } = useSignInMediaQuery();
    
    return(<>
        {isDesktopWidth && !isMobileHeight && <SignInFooterDesktop/>}
    </>
    );
};

export default SignInFooter;