import React from 'react';
import s from './ProductCardColorsAdd.module.scss';
import Plus from '../../../../../../../../common/assets/images/plus.svg';
import BarChartHorizontal from '../../../../../../../../common/assets/images/bar-chart-horizontal.svg';
import ArrowDown from '../../../../../../../../common/assets/images/arrowDown.svg';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { PRODUCT_CARD_DICTIONARY } from '../../../../ProductsCard.dictionary';

const {
    SIZE_PROPTYPES,
} = PRODUCT_CARD_DICTIONARY;
const ProductCardColorsAdd = ({ sizes, handleAddTab }) => {

    return (
        <div className={s.ProductCardColorsAdd}>
            <div 
                className={classNames(s.ProductCardColorsAdd_item, s.ProductCardColorsAdd_item_add)} 
                onClick={handleAddTab}
                data-testid={'add-tab'}
            >
                <Plus/>
            </div>
            {sizes.map(size => (
                <div key={size.sizeValue} className={s.ProductCardColorsAdd_item}>
                    <BarChartHorizontal/>
                    <div className={s.ProductCardColorsAdd_item_arrowDown}>
                        <ArrowDown/>
                    </div>
                </div>
            ))}
        </div>
    );
};

ProductCardColorsAdd.propTypes = {
    sizes: PropTypes.arrayOf(SIZE_PROPTYPES).isRequired,
    handleAddTab: PropTypes.func.isRequired,
};


export default ProductCardColorsAdd;