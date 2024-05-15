import React, { useEffect, useState } from 'react';
import s from './RegistrationSetting.module.scss';
import { REGISTRATION_SETTING_DICTIONARY } from './RegistrationSetting.dictionary';
import { useToasters } from '../../../../common/ui/contexts/ToastersContext';
import { getOrders } from '../../api/getOrders';
import { getOrderStatuses } from '../../api/getOrderStatuses';
import RegistrationSettingItem from './components/RegistrationSettingItem';

const {
    TITLE
} = REGISTRATION_SETTING_DICTIONARY;
const RegistrationSetting = () => {
    const [orders, setOrders] = useState(null);
    const [orderStatuses, setOrderStatuses] = useState(null);

    const { showToasterSuccess, showToasterError } = useToasters();

    useEffect(() => {
        async function fetchOrders() {
            try {
                const orders = await getOrders();
                setOrders(orders);
            } catch (e) {
                showToasterError('Произошла ошибка при загрузке данных');
            }
        }

        async function fetchOrderStatuses() {
            try {
                const orderStatuses = await getOrderStatuses();
                setOrderStatuses(orderStatuses);
            } catch (e) {
                showToasterError('Произошла ошибка при загрузке данных');
            }
        }

        fetchOrders();
        fetchOrderStatuses();
    }, []);

    return (
        <div className={s.RegistrationSetting}>
            <h2>{TITLE}</h2>
            {orders && orderStatuses && orders.map((order) => (
                <RegistrationSettingItem
                    key={order.id}
                    order={order}
                    orderStatuses={orderStatuses}
                />
            ))}
        </div>
    );
};

export default RegistrationSetting;
