import React from 'react';
import SettingsList from '../SettingsList';
import s from './ModelSettings.module.scss';
import { ButtonAccent, ButtonDefault } from '../../../../../../common/ui/components/Buttons';
import { useCatalogSettings } from '../../contexts/CatalogSettingsContext/hook/useCatalogSettings';


export const ModelSettings = () =>{

    const { settings, updateModels } = useCatalogSettings();

    const handleReorder = (reorderedModels) =>{
        updateModels(reorderedModels);
    };

    return (
        <div className={s.ModelSettings}>
            <button className={s.addButton}>
                +Добавить
            </button>

            <SettingsList settings={settings.models} handleReorder={handleReorder}/>
            <div className={s.buttonArea}>
                <ButtonDefault text='Отмена'/>
                <ButtonAccent text='Сохранить'/>
            </div>
        </div>
    );
};

export default ModelSettings;
