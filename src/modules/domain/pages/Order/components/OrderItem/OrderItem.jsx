import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import s from './OrderItem.module.scss';
import { ORDER_DICTIONARY } from '../../ORDER_DICTIONARY';
import EnhancedImage from '../../../../../../common/ui/components/Image/EnchancedImage';
import { ReactComponent as Trash } from '../../../../../../common/assets/images/Trash.svg';

const {
    NAME,
    SIZE,
    COLOR
} = ORDER_DICTIONARY;

const OrderItem = (props) => {
    const {
        product,
        handleClick,
        handleDelete
    } = props;



    return (
        <div className={s.OrderItem_wrapper}>
            <div className={s.OrderItem} onClick={handleClick}>
                <div>
                    <EnhancedImage
                        imageUrl={product.product.mainImageUrl}
                        alt="selected image"
                    />
                </div>
                <div className={s.OrderItem_info}>
                    <div className={s.OrderItem_info_item}>
                        <h4>{NAME}</h4>
                        <p>{product.product.name}</p>
                    </div>
                    <div className={s.OrderItem_info_item}>
                        <h4>{COLOR}</h4>
                        <p>{product.colorSize.color.name}</p>
                    </div>
                    <div className={s.OrderItem_info_item}>
                        <h4>{SIZE}</h4>
                        <p>{product.colorSize.size.sizeValue}</p>
                    </div>
                </div>
            </div>
            <div className={s.OrderItem_trash} onClick={handleDelete}>
                <Trash />
            </div>
        </div>
    );
};

OrderItem.propTypes = {
    product: PropTypes.object.isRequired,
    handleDelete: PropTypes.func.isRequired,
    handleClick: PropTypes.func.isRequired
};


export default OrderItem;