import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { Domain } from '../../../../modules';
import { Admin } from '../../../../modules';
import { DeviceTypeProvider } from '../../contexts/DeviceType';
import ToastersProvider from '../../contexts/ToastersContext';
import { ModalProvider } from 'react-modal-hook';

const App = () => {

    return (
        <DeviceTypeProvider>
            <ToastersProvider>
                <ModalProvider>
                    <Routes>
                        <Route path="/" element={<Navigate to="domain"/>}/>
                        <Route path="/admin/*" element={<Admin/>}/>
                        <Route path="/domain/*" element={<Domain/>}/>
                    </Routes>
                </ModalProvider>
            </ToastersProvider>
        </DeviceTypeProvider>
    );
};

export default App;
