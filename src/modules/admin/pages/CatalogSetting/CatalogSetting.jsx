import React from 'react';
import s from './CatalogSetting.module.scss';
import SettingDropdown from './components/SettingDropdown/SettingDropdown';


const CatalogSetting = () => {
    return (
        <div className={s.container}>
            <div className={s.wrapper_title_page}>
                <h3 className={s.title_page}>Управление каталогом</h3>
            </div>
            <SettingDropdown />
        </div>
    );
};

export default CatalogSetting;
