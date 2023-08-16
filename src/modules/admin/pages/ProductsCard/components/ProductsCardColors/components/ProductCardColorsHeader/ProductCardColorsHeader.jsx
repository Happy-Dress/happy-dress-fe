import React from 'react';
import { PRODUCT_CARD_DICTIONARY } from '../../../../ProductsCard.dictionary';
import s from './ProductCardColorsHeader.module.scss';
import classNames from 'classnames';
import PropTypes from 'prop-types';

const {
    SIZE_TEXT,
    COLOR_TEXT,
    SIZE_PROPTYPES,
} = PRODUCT_CARD_DICTIONARY;

const ProductCardColorsHeader = ({ sizes }) => {
    return (
        <div className={s.ColorsHeader}>
            <div className={s.ColorsHeader_leftBar}>
                <div className={classNames(s.ColorsHeader_item, s.ColorsHeader_item_small)}>{SIZE_TEXT}</div>
                <div className={classNames(s.ColorsHeader_item, s.ColorsHeader_item_small)}>{COLOR_TEXT}</div>
            </div>
            {sizes.map((size) => (
                <div
                    key={size.sizeValue}
                    className={s.ColorsHeader_item}
                    data-testid={'size-item'}
                >
                    {size.sizeValue}
                </div>
            ))}
        </div>
    );
};

ProductCardColorsHeader.propTypes = {
    sizes: PropTypes.arrayOf(SIZE_PROPTYPES).isRequired,
};

export default ProductCardColorsHeader;