import React from 'react';
import s from './ProductCardColorsAdd.module.scss';
import { ReactComponent as Plus } from '../../../../../../../../common/assets/images/plus.svg';
import { ReactComponent as BarChartHorizontal } from '../../../../../../../../common/assets/images/bar-chart-horizontal.svg';
import { ReactComponent as ArrowDown } from '../../../../../../../../common/assets/images/arrowDown.svg';
import classNames from 'classnames';
import PropTypes from 'prop-types';
const ProductCardColorsAdd = ({ sizes, handleAddTab }) => {

    return (
        <div className={s.ProductCardColorsAdd}>
            <div 
                className={classNames(s.ProductCardColorsAdd_item, s.ProductCardColorsAdd_item_add)} 
                onClick={handleAddTab}
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
    sizes: PropTypes.array.isRequired,
    handleAddTab: PropTypes.func.isRequired,
};


export default ProductCardColorsAdd;