import React from 'react';
import s from './ProductCardSkeleton.module.scss';
import classNames from 'classnames';

const ProductCardSkeleton = () =>{
    return (
        <div className={s.ProductCardSkeleton}>
            <div className={s.ProductCardSkeleton_image}/>
            <div className={s.ProductCardSkeleton_footer}>
                <div className={s.ProductCardSkeleton_name}/>
                <div className={classNames(s.ProductCardSkeleton_infoRow, s.ProductCardSkeleton_firstRow)}>
                    <div className={s.ProductCardSkeleton_property}/>
                    <div className={s.ProductCardSkeleton_propertyValues}>
                        <div className={s.ProductCardSkeleton_propertyValue}/>
                        <div className={s.ProductCardSkeleton_propertyValue}/>
                        <div className={s.ProductCardSkeleton_propertyValue}/>
                        <div className={s.ProductCardSkeleton_propertyValue}/>
                    </div>
                </div>
                <div className={s.ProductCardSkeleton_infoRow}>
                    <div className={s.ProductCardSkeleton_property}/>
                    <div className={s.ProductCardSkeleton_propertyValues}>
                        <div className={s.ProductCardSkeleton_propertyValue}/>
                        <div className={s.ProductCardSkeleton_propertyValue}/>
                        <div className={s.ProductCardSkeleton_propertyValue}/>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductCardSkeleton;
