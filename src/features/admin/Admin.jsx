import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import CatalogSettings from './pages/CatalogSettings/CatalogSettings';
import SignIn from './pages/SignIn';

const Admin = () => {
    return (
        <Routes>
            <Route path='/' element={<Navigate to='sign-in'/>}/>
            <Route path='/sign-in' element={<SignIn/>}/>
            <Route path='/catalog-settings' element={<CatalogSettings/>}/>
        </Routes>
    );
};

export default Admin;