import React, { Suspense } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { ROUTER_PATHS, routerConfig } from '../../config';
import Product from '../../pages/Product';

const DomainRoutes = () => {
    return (
        <Suspense fallback={<div>loading suspense</div>}>
            <Routes>
                <Route path={'/'} element={<Navigate to={ROUTER_PATHS.home}/>}/>
                {
                    Object.values(routerConfig).map(({ path, element }) => {
                        return <Route path={path} element={element} key={path}/>;
                    })
                }
                <Route path={'/catalog/:id'} element={<Product/>}/>
            </Routes>
        </Suspense>
    );
};

export default DomainRoutes;
