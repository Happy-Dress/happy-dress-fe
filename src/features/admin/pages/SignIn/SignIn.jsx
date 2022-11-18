import React from 'react';
import SignInHeader from './components/Header';
import SignInFooter from './components/Footer';
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