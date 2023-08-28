import React from 'react';
import s from './CategoriesSkeletonDesktop.module.scss';

const CategoriesSkeletonDesktop = () => {
    return (
        <div className={s.CategoriesSkeletonDesktop}>
            <div className={s.CategoriesSkeletonDesktop_title}/>
            <div className={s.CategoriesSkeletonDesktop_wrapper}>
                <div className={s.CategoriesSkeletonDesktop_cards}>
                    <div className={s.CategoriesSkeletonDesktop_card}>
                        <div className={s.CategoriesSkeletonDesktop_main}/>
                        <div className={s.CategoriesSkeletonDesktop_description}>
                            <div className={s.CategoriesSkeletonDesktop_description_name}/>
                            <div className={s.CategoriesSkeletonDesktop_description_text}/>
                        </div>
                    </div>
                    <div className={s.CategoriesSkeletonDesktop_card}>
                        <div className={s.CategoriesSkeletonDesktop_small}/>
                        <div className={s.CategoriesSkeletonDesktop_description}>
                            <div className={s.CategoriesSkeletonDesktop_description_name}/>
                            <div className={s.CategoriesSkeletonDesktop_description_text}/>
                        </div>
                    </div>
                    <div className={s.CategoriesSkeletonDesktop_card}>
                        <div className={s.CategoriesSkeletonDesktop_medium}/>
                        <div className={s.CategoriesSkeletonDesktop_description}>
                            <div className={s.CategoriesSkeletonDesktop_description_name}/>
                            <div className={s.CategoriesSkeletonDesktop_description_text}/>
                        </div>
                    </div>
                    <div className={s.CategoriesSkeletonDesktop_card}>
                        <div className={s.CategoriesSkeletonDesktop_small}/>
                        <div className={s.CategoriesSkeletonDesktop_description}>
                            <div className={s.CategoriesSkeletonDesktop_description_name}/>
                            <div className={s.CategoriesSkeletonDesktop_description_text}/>
                        </div>
                    </div>
                    <div className={s.CategoriesSkeletonDesktop_card}>
                        <div className={s.CategoriesSkeletonDesktop_medium}/>
                        <div className={s.CategoriesSkeletonDesktop_description}>
                            <div className={s.CategoriesSkeletonDesktop_description_name}/>
                            <div className={s.CategoriesSkeletonDesktop_description_text}/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CategoriesSkeletonDesktop;