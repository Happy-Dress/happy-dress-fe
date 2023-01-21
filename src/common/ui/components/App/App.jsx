import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { Domain } from '../../../../modules';
import { Admin } from '../../../../modules';
import { DeviceTypeProvider } from '../../contexts/DeviceType';
import ToastersProvider from '../../contexts/ToastersContext';
const App = () => {

    return (
        <DeviceTypeProvider>
            <ToastersProvider>
                <Routes>
                    <Route path="/" element={<Navigate to="domain"/>}/>
                    <Route path="/admin/*" element={<Admin/>}/>
                    <Route path="/domain/*" element={<Domain/>}/>
                </Routes>
            </ToastersProvider>
        </DeviceTypeProvider>
    );
};

export default App;
