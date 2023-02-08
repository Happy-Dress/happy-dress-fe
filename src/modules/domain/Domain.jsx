import React from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import AppRoutes from './components/AppRoutes';



const Domain = () => {
    return (<>
        <Header/>
        {/* Список и настройка путей в router.js */}
        <AppRoutes />
        <Footer/>
    </>);
};

export default Domain;
