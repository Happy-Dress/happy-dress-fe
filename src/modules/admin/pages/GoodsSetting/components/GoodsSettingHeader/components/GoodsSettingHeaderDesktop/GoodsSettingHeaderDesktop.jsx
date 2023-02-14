import React, { useState } from 'react';
import s from './GoodsSettingHeader.module.scss';
import { GOODS_SETTING_DICTIONARY } from '../../../../GoodsSetting.dictionary';
import { DressCategories } from './components/DressCategories';
import { Filters } from './components/Filters';
import classNames from 'classnames';
import { SearchContainer } from './components/SearchContainer';

const {
    TITLE
} = GOODS_SETTING_DICTIONARY;

const GoodsSettingHeaderDesktop = () => {

    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className={s.GoodsSettingHeaderDesktop}>
            <div className={s.breadCrumbs}>{TITLE}</div>
            <h1>{TITLE}</h1>

            <div className={s.headerContainer}>
                <DressCategories />
                <div className={classNames(s.filtersContainer, isOpen ? s.active : '')}>
                    <SearchContainer setIsOpen={setIsOpen}/>
                    {isOpen && <Filters />}
                </div>
            </div>
        </div>
    );
};

export default GoodsSettingHeaderDesktop;
