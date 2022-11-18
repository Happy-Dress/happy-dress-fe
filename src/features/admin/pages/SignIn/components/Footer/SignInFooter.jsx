import React from 'react';
import SignInFooterDesktop from './FooterDesktop';
import useSignInMediaQuery from '../../hooks/useSignInMediaQuery';

const SignInFooter = () => {
    const { isDesktop } = useSignInMediaQuery();
    
    return(<>
        {isDesktop && <SignInFooterDesktop/>}
    </>
    );
};

export default SignInFooter;