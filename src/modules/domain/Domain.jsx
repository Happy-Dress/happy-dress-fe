import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import Landing from './pages/Landing';
import Header from './components/Header';
import Footer from './components/Footer';
import Categories from './pages/Landing/Categories/Categories';

const Domain = () => {
    return (<>
        <Header/>
        <Routes>
            <Route path='/' element={<Navigate to='home'/>}/>
            <Route path='/home' element={<Landing/>}/>
        </Routes>
        <Categories />
        <Footer/>
    </>);
};

export default Domain;
