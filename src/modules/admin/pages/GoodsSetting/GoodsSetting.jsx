import React from 'react';
import s from './GoodsSetting.module.scss';
import GoodsSettingHeader from './components/GoodsSettingHeader';


const GoodsSetting = () => {


    return (
        <div className={s.GoodsSetting}>
            <GoodsSettingHeader />
        </div>
    );
};

export default GoodsSetting;
