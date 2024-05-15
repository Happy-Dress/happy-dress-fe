import React, { useEffect } from 'react';

import Header from './components/Header';
import Footer from './components/Footer';
import { DomainRoutes } from './components/DomainRoutes';
import { useDispatch } from 'react-redux';
import { setCount } from '../../common/ui/store/slices/ordersSlice';


const Domain = () => {

    const dispatch = useDispatch();

    useEffect(() => {
        if (!localStorage.getItem('orders')) {
            localStorage.setItem('orders', JSON.stringify([]));
            dispatch(setCount(0));
        } else {
            const orders = localStorage.getItem('orders');
            const parsedOrders = JSON.parse(orders);
            dispatch(setCount(parsedOrders.length));
        }
    }, []);

    return (<>
        <Header/>
        <DomainRoutes/>
        <Footer/>
    </>);
};

export default Domain;
