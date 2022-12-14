import React from 'react';
import s from './CatalogSetting.module.scss';
import CatalogSettingModal from '../../components/CatalogSettingModal/CatalogSettingModal';


const CatalogSetting = () => {
    return (
        <div className={s.container}>
            <div className={s.wrapper_title_page}>
                <h3 className={s.title_page}>Управление каталогом</h3>
            </div>
            <CatalogSettingModal/>
        </div>
    );
};

export default CatalogSetting;
