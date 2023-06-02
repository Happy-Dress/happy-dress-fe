import React from 'react';
import s from './LoaderFullScreen.module.scss';

const LoaderFullScreen = () => {
    return (
        <div className={s.Loader_wrapper}>
            <div className={s.Loader}></div>
        </div>
    );
};

export default LoaderFullScreen;