import React from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import AuthorizationForm from './components/AuthorizationForm';


const SignIn = () => {
    return (<>
        <Header/>
        <AuthorizationForm/>
        <Footer/>
    </>
    );
};

export default SignIn;