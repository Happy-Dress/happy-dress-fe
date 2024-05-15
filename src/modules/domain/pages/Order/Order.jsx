import React, { useEffect, useState } from 'react';
import { ORDER_DICTIONARY } from './ORDER_DICTIONARY';
import s from './Order.module.scss';
import OrderItem from './components/OrderItem';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchOrderProduct, setCount } from '../../../../common/ui/store/slices/ordersSlice';
import Loader from '../../../../common/ui/components/Loader';
import { ButtonAccent } from '../../../../common/ui/components';
import { useModal } from 'react-modal-hook';
import SubmitOrderDialog from '../../../../common/ui/components/Dialogs/SubmitOrderDialog';
import { useToasters } from '../../../../common/ui/contexts/ToastersContext';
import { addOrder } from '../../../../common/api/addOrder/addOrder';

const {
    NONE_ORDER,
    ORDERS_LABEL,
    CREATE_ORDER,
    SUCCESS_ORDERED,
    ERROR_ORDERED,
} = ORDER_DICTIONARY;

const Order = () => {
    const [orders, setOrders] = useState([]);
    const isLoading = useSelector((state) => state.orders.loading);
    const count = useSelector((state) => state.orders.count);
    const { showToasterSuccess, showToasterError } = useToasters();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [showModal, hideModal] = useModal(() => (
        <SubmitOrderDialog onClose={hideModal} onSubmit={onSubmit}/>
    ));

    const onSubmit = async (data) => {
        const order = JSON.parse(localStorage.getItem('orders'));
        const dataOrders = {
            name: data.name,
            phoneNumber: data.phone,
            comment: data.comment,
            products: order.map((order) => {
                return {
                    productId: order.productId,
                    productColorSizeId: order.colorSize.id,
                };
            })
        };

        try {
            await addOrder(dataOrders);
            dispatch(setCount(0));
            localStorage.removeItem('orders');
            hideModal();
            showToasterSuccess(SUCCESS_ORDERED);
        } catch (e) {
            showToasterError(ERROR_ORDERED);
        }
    };

    const handleClick = (product) => {
        navigate(`/domain/catalog/${product.productId}?colorId=${product.colorSize.color.id}&sizeId=${product.colorSize.size.id}`);
    };

    const handleDelete = (product) => {
        const orders = JSON.parse(localStorage.getItem('orders'));
        const newOrders = orders.filter(order => !(order.productId === product.product.id && order.colorSize.id === product.colorSize.id));
        localStorage.setItem('orders', JSON.stringify(newOrders));
        dispatch(setCount(newOrders.length));
    };

    useEffect(() => {
        const fetchedProducts = [];
        const fetchProductsData = async (localStorageOrders) => {
            for (const order of localStorageOrders) {
                const product = await (dispatch(fetchOrderProduct({ productId: order.productId, isSecure: false })).unwrap());
                fetchedProducts.push({
                    ...order,
                    product: product
                });

            }
            setOrders(fetchedProducts);
        };

        const localStorageOrders = localStorage.getItem('orders');
        if (localStorageOrders) {
            fetchProductsData(JSON.parse(localStorageOrders));
        } else {
            setOrders([]);
        }
    }, [count]);
    
    
    return (
        isLoading ? <Loader/> : orders.length > 0 ?
            <div className={s.Order}>
                <h2>{ORDERS_LABEL} ({orders.length})</h2>
                {orders.map((order, index) => <OrderItem key={index} product={order} handleClick={() => handleClick(order)} handleDelete={() => handleDelete(order)}/>)}
                <div>
                    <ButtonAccent text={CREATE_ORDER} onClick={showModal}/>
                </div>
            </div>
            :
            <div className={s.NoneOrder}>
                <h2>{NONE_ORDER}</h2>
            </div>
    );
};

export default Order;