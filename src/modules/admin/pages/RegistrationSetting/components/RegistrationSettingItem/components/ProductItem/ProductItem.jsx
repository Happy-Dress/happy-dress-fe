import React from 'react';
import PropTypes from 'prop-types';
import s from './ProductItem.module.scss';
import { ORDER_DICTIONARY } from '../../../../../../../domain/pages/Order/ORDER_DICTIONARY';

const {
    NAME,
    SIZE,
    COLOR
} = ORDER_DICTIONARY;

const ProductItem = ({ product, onClick }) => {

    return (
        <div className={s.ProductItem} onClick={onClick}>
            <div className={s.ProductItem_field}>
                <h4>{NAME}</h4>
                <p>{product.name}</p>
            </div>
            <div className={s.ProductItem_field}>
                <h4>{COLOR}</h4>
                <p>{product.productColorSize.color.name}</p>
            </div>
            <div className={s.ProductItem_field}>
                <h4>{SIZE}</h4>
                <p>{product.productColorSize.size.sizeValue}</p>
            </div>
        </div>
    );
};

ProductItem.propTypes = {
    product: PropTypes.object.isRequired,
    onClick: PropTypes.func.isRequired
};

export default ProductItem;