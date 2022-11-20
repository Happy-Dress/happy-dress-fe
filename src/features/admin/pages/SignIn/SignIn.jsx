import React from 'react';
import SignInHeader from './components/SignInHeader';
import SignInFooter from './components/SignInFooter';
import AuthorizationForm from './components/AuthorizationForm';


const SignIn = () => {

    return (<>
        <SignInHeader/>
        <AuthorizationForm/>
        <SignInFooter/>
    </>
    );
};

export default SignIn;