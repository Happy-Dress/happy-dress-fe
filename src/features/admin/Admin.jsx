import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import SignIn from './pages/SignIn';

const Admin = () => {
    return (
        <Routes>
            <Route path='/' element={<Navigate to='sign-in'/>}/>
            <Route path='/sign-in' element={<SignIn/>}/>

        </Routes>
    );
};

export default Admin;
