import React from 'react';
import { PRODUCT_SETTINGS_DICTIONARY } from '../../../ProductSettings.dictionary';
import s from './ProductCardMobile.module.scss';

const ProductCardMobile = () => {
    const { BREADCRUMBS, PRODUCT_CARD_TITLE, PRODUCT_CARD } =
      PRODUCT_SETTINGS_DICTIONARY;
    return (
        <div className={s.ProductCardMobile}>
            <div className={s.ProductCardMobile_way}>{(BREADCRUMBS+PRODUCT_CARD)}</div>
            <h2 className={s.ProductCardMobile_heading}>{PRODUCT_CARD_TITLE}</h2>
        </div>
    );
};

export default ProductCardMobile;