import s from './CatalogSetting.module.scss';
import ButtonDefault from '../../../../common/components/Buttons/ButtonDefault';
import ButtonAccent from '../../../../common/components/Buttons/ButtonAccent';
import SettingsDropDown from './components/SettingDropDown';
import { CATALOG_SETTING_DICTIONARY } from './CatalogSetting.dictionary';

const {
    CATEGORIES_SETTINGS_NAME,
    COLORS_SETTINGS_NAME,
    MATERIAL_SETTINGS_NAME,
    MODEL_SETTINGS_NAME,
} = CATALOG_SETTING_DICTIONARY;

const CatalogSettings = () => {

    const items = [
        {
            element: <div>Настройки категорий</div>,
            name: CATEGORIES_SETTINGS_NAME,
        },
        {
            element: <div>Настройки цветов</div>,
            name: COLORS_SETTINGS_NAME,
        },
        {
            element: <div>Настройки материалов</div>,
            name: MATERIAL_SETTINGS_NAME,
        },
        {
            element: <div>Настройки моделей</div>,
            name: MODEL_SETTINGS_NAME,
        }
    ];


    return(
        <div className={s.CatalogSettings}>
            <div className={s.Way}>Главная &gt; Управление каталогом</div>
            <h2>Управление каталогом</h2>
            <div className={s.categories}>
                {
                    items.map((el, index) => (
                        <SettingsDropDown key={index} name={el.name}>
                            {el.element}
                        </SettingsDropDown>
                    ))
                }    
            </div>
            <div className={s.buttons}>
                <ButtonDefault text='Отмена'/>
                <ButtonAccent text='Сохранить'/>
            </div>
        </div>
    );
};

export default CatalogSettings;
