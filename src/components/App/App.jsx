import React from 'react';
import './App.module.scss';
import Header from '../Header';
import Footer from '../Footer';
import { Route, Routes, Navigate } from 'react-router-dom';
import Landing from '../../feature/Landing';

const App = () => {
    return (
        <div className='App'>
            <Header/>
            <Routes>
                <Route path='/' element={<Navigate to='/main/home' replace/>}/>
                <Route path='/main/home' element={<Landing/>}/>
            </Routes>
            <Footer/>
        </div>
    );
};

export default App;
