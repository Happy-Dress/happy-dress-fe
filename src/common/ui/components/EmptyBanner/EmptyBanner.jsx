import React from 'react';
import s from './EmptyBanner.module.scss';
import { ReactComponent as WomenInDress } from './../../../assets/images/WomenInDress.svg';

const NOT_FOUND_TEXT = 'Не найдено';
const NOT_FOUND_DESCRIPTION_TEXT = 'Попробуйте изменить параметры поиска или фильтры, чтобы найти то, что вы ищете.';


const EmptyBanner = () => {
    return (
        <div className={s.EmptyBanner}>
            <div className={s.EmptyBanner_text}>
                <h3>{NOT_FOUND_TEXT}</h3>
                <p>{NOT_FOUND_DESCRIPTION_TEXT}</p>
            </div>
            <WomenInDress className={s.EmptyBanner_image}/>
        </div>
    );
};

export default EmptyBanner;