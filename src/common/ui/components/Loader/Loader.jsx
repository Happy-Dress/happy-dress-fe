import React from 'react';
import s from './Loader.module.scss';


const Loader = () => {
    return (
        <div className={s.Loader_wrapper}>
            <div className={s.Loader}></div>
        </div>
    );
};

export default Loader;