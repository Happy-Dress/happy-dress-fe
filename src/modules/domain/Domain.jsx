import React from 'react';

import Header from './components/Header';
import Footer from './components/Footer';
import { DomainRoutes } from './components/DomainRoutes';


const Domain = () => {
    return (<>
        <Header/>
        <DomainRoutes />
        <Footer/>
    </>);
};

export default Domain;
