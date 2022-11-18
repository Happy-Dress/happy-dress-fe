import React from 'react';
import SignInHeaderDesktop from './HeaderDesktop';
import useSignInMediaQuery from '../../hooks/useSignInMediaQuery';


const SignInHeader = () => {

    const { isDesktop } = useSignInMediaQuery();
    
    return(<>
        {isDesktop && <SignInHeaderDesktop/>}
    </>
    );
};

export default SignInHeader;