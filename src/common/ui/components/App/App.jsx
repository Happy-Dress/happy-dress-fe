import React, { useEffect } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { Domain } from '../../../../modules';
import { Admin } from '../../../../modules';
import { DeviceTypeProvider } from '../../contexts/DeviceType';
import ToastersProvider from '../../contexts/ToastersContext';
import { ModalProvider } from 'react-modal-hook';
import { Provider } from 'react-redux';
import { setupStore } from '../../store/setupStore';

const App = () => {

    useEffect(() =>{
        document.oncontextmenu = () => false;
    });

    return (
        <Provider store={setupStore()}>
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
        </Provider>
    );
};

export default App;
