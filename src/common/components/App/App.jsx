import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { Domain } from '../../../features';
import { Admin } from '../../../features';
import { DeviceTypeProvider } from '../../contexts/DeviceType';


const App = () => {
    return (
        <DeviceTypeProvider>
            <Routes>
                <Route path='/' element={<Navigate to='domain'/>}/>
                <Route path='/admin/*' element={<Admin/>}/>
                <Route path='/domain/*' element={<Domain/>}/>
            </Routes>
        </DeviceTypeProvider>
    );
};

export default App;
