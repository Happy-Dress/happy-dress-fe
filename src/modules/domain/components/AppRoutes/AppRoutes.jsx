import React, { Suspense } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import { router } from '../../router';


const AppRoutes = () => {
    return (
        <Suspense fallback={<div>Loader..</div>}>
            <Routes>
                <Route path='/' element={<Navigate to='home'/>}/>
                {
                    Object.values(router).map(({ path, element }) => {     // Список и настройка путей в router
                        return <Route key={path} path={path} element={element}/>;
                    })
                }
            </Routes>
        </Suspense>
    );
};

export default AppRoutes;