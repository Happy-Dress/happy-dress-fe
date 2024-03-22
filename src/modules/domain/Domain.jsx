import React, { useEffect } from 'react';

import Header from './components/Header';
import Footer from './components/Footer';
import { DomainRoutes } from './components/DomainRoutes';


const Domain = () => {

    useEffect(() =>{
        document.oncontextmenu = () => false;
    });
    
    return (<>
        <Header/>
        <DomainRoutes />
        <Footer/>
    </>);
};

export default Domain;
