import React from 'react';
import s from './ProductsCardColors.module.scss';
import { PCC_Header } from './components/PCC_Header/PCC_Header';
import { PCC_Colors } from './components/PCC_Colours/PCC_Colors';


const ProductsCardColors = () => {
    return (
        <div className={s.PCC}>
            <PCC_Header />
            <PCC_Colors />
        </div>
    );
};

export default ProductsCardColors;
