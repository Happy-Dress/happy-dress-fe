import React, { Suspense } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import { routerConfig } from '../../routerConfig';


const AppRoutes = () => {
    return (
        <Suspense fallback={<div>Loader..</div>}>
            <Routes>
                <Route path='/' element={<Navigate to='home'/>}/>
                {
                    Object.values(routerConfig).map(({ path, element }) => {     // Список и настройка путей в routerConfig
                        return <Route key={path} path={path} element={element}/>;
                    })
                }
            </Routes>
        </Suspense>
    );
};

export default AppRoutes;