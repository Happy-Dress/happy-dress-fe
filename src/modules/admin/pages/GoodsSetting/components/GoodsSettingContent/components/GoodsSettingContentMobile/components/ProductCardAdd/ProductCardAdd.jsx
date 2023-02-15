import React from 'react';
import s from './ProductCardAdd.module.scss';
import { ReactComponent as AddIconHover } from '../../../../../../../../../../common/assets/images/AddIconHover.svg';

const ProductCardAdd = () => {

    return (
        <div className={s.box}>
            <div className={s.ProductCardAdd}>
                <AddIconHover />
            </div>
        </div>
    );
};


export default ProductCardAdd;
