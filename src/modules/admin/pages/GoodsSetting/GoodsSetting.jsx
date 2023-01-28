import React from 'react';
import s from './GoodsSetting.module.scss';
import GoodsSettingHeader from './components/GoodsSettingHeader';
import GoodsSettingContent from './components/GoodsSettingContent';


const GoodsSetting = () => {


    return (
        <div className={s.GoodsSetting}>
            <GoodsSettingHeader />
            <GoodsSettingContent />
        </div>
    );
};

export default GoodsSetting;
