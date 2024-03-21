import React, { Suspense } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { ROUTER_PATHS, routerConfig } from '../../config';
import Product from '../../pages/Product';
import Loader from '../../../../common/ui/components/Loader';
import Order from '../../pages/Order';

const DomainRoutes = () => {
    return (
        <Suspense fallback={<Loader/>}>
            <Routes>
                <Route path={'/'} element={<Navigate to={ROUTER_PATHS.home}/>}/>
                {
                    Object.values(routerConfig).map(({ path, element }) => {
                        return <Route path={path} element={element} key={path}/>;
                    })
                }
                <Route path={'/catalog/:id'} element={<Product/>}/>
                <Route path={'/order'} element={<Order/>}/>
            </Routes>
        </Suspense>
    );
};

export default DomainRoutes;
