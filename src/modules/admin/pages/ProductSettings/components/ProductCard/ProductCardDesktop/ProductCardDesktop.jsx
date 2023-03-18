import React from 'react';
import { PRODUCT_SETTINGS_DICTIONARY } from '../../../ProductSettings.dictionary';
import s from './ProductCardDesktop.module.scss';

const ProductCardDesktop = () => {
    const { BREADCRUMBS, PRODUCT_CARD_TITLE, PRODUCT_CARD } = PRODUCT_SETTINGS_DICTIONARY;
    return (
        <div className={s.ProductCardDesktop}>
            <div className={s.ProductCardDesktop_way}>{BREADCRUMBS + PRODUCT_CARD}</div>
            <h2 className={s.ProductCardDesktop_heading}>
                {PRODUCT_CARD_TITLE}
            </h2>
        </div>
    );
};

export default ProductCardDesktop;