import React from 'react';
import PropTypes from 'prop-types';
import { REGISTRATION_SETTING_DICTIONARY } from '../../RegistrationSetting.dictionary';
import { DropdownSelect } from '../../../../../../common/ui/components/DropdownSelect';
import s from './RegistrationSettingItem.module.scss';
import ProductItem from './components/ProductItem';
import { useNavigate } from 'react-router-dom';
import { updateOrder } from '../../../../api/updateOrder';
import { useToasters } from '../../../../../../common/ui/contexts/ToastersContext';

const {
    ORDER,
    NAME,
    COMMENT,
    ITEMS,
    PHONE_NUMBER,
    SUCCESS_UPDATE,
    ERROR_UPDATE
} = REGISTRATION_SETTING_DICTIONARY;

const RegistrationSettingItem = (props) => {
    const {
        order,
        orderStatuses
    } = props;

    const { showToasterError, showToasterSuccess } = useToasters();
    const navigate = useNavigate();

    const onChangeOrderStatus = async (data) => {
        const dataOrders = {
            name: order.name,
            phoneNumber: order.phoneNumber,
            comment: order.comment,
            statusId: +data,
            products: order.products.map((order) => {
                return {
                    productId: order.id,
                    productColorSizeId: order.productColorSize.id,
                };
            })
        };

        try {
            await updateOrder(order.id, dataOrders);
            showToasterSuccess(SUCCESS_UPDATE);
        } catch (e) {
            showToasterSuccess(ERROR_UPDATE);
        }
    };

    const handleClick = (product) => {
        navigate(`/domain/catalog/${product.id}?colorId=${product.productColorSize.color.id}&sizeId=${product.productColorSize.size.id}`);
    };

    return (
        <div className={s.RegistrationSettingItem}>
            <div className={s.RegistrationSettingItem_order}>
                <h4>{ORDER}</h4>
                <p>{order.id}</p>
            </div>
            <div className={s.RegistrationSettingItem_wrapper}>
                <div className={s.RegistrationSettingItem_mainInfo}>
                    <div>
                        <div className={s.RegistrationSettingItem_mainInfo_userInfo}>
                            <div className={s.RegistrationSettingItem_mainInfo_userInfo_item}>
                                <h4>{NAME}</h4>
                                <p>{order.name}</p>
                            </div>
                            <div className={s.RegistrationSettingItem_mainInfo_userInfo_item}>
                                <h4>{PHONE_NUMBER}</h4>
                                <p>{order.phoneNumber}</p>
                            </div>
                            <div className={s.RegistrationSettingItem_mainInfo_userInfo_item}>
                                <h4>{COMMENT}</h4>
                                <p>{order.comment}</p>
                            </div>
                        </div>
                    </div>
                    <div className={s.RegistrationSettingItem_mainInfo_status}>
                        {order && <DropdownSelect
                            name={`status${order.id}`}
                            options={Array.isArray(orderStatuses) && orderStatuses?.map((orderStatus) => {
                                return {
                                    value: orderStatus.id,
                                    label: orderStatus.name
                                };
                            })}
                            defaultValues={[order.status.id]}
                            size={'small'}
                            onChange={(e) => onChangeOrderStatus(e.target.value)}
                            multiple={false}
                        />}
                    </div>
                </div>
                <div className={s.RegistrationSettingItem_items}>
                    <h4>{ITEMS}</h4>
                    {order && order.products.map((product, index) => {
                        return (<ProductItem key={index} product={product} onClick={() => handleClick(product)}/>);
                    })}
                </div>
            </div>
        </div>
    );
};

RegistrationSettingItem.propTypes = {
    order: PropTypes.object.isRequired,
    orderStatuses: PropTypes.array.isRequired
};

export default RegistrationSettingItem;