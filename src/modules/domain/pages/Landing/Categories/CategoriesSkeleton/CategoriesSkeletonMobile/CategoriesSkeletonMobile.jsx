import React from 'react';
import s from './CategoriesSkeletonMobile.module.scss';

const CategoriesSkeletonMobile = () => {
    return(
        <div className={s.CategoriesSkeletonMobile}>
            <div className={s.CategoriesSkeletonMobile_title}/>
            <div className={s.CategoriesSkeletonMobile_dots}/>
            <div className={s.CategoriesSkeletonMobile_image}/>
            <div className={s.CategoriesSkeletonMobile_description}>
                <div className={s.CategoriesSkeletonMobile_description_name}/>
                <div className={s.CategoriesSkeletonMobile_description_text}/>
            </div>
        </div>
    );
};

export default CategoriesSkeletonMobile;