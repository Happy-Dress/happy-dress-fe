import React from 'react';
import {Navigate, Route, Routes} from 'react-router-dom';
import {Domain} from '../../features';
import {Admin} from '../../features';

const App = () => {
    return (
        <Routes>
            <Route path='/' element={<Navigate to='domain'/>}/>
            <Route path='/admin/*' element={<Admin/>}/>
            <Route path='/domain/*' element={<Domain/>}/>
        </Routes>
    );
};

export default App;
