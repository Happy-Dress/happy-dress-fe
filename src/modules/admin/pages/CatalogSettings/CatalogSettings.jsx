import s from './CatalogSettings.module.scss';
import SettingsDropDown from './components/ModelSettings/components/SettingDropDown';
import { CATALOG_SETTINGS_DICTIONARY } from './CatalogSettings.dictionary';
import { ButtonAccent, ButtonDefault } from '../../../../common/ui/components';
import ModelSettings from './components/ModelSettings';
import { useCatalogSettings } from './contexts/CatalogSettingsContext/hook/useCatalogSettings';
import CatalogSettingsProvider from './contexts/CatalogSettingsContext/provider/CatalogSettingsProvider';
import withProvider from '../../../../common/ui/hocs/withProvider';

const {
    CATEGORIES_SETTINGS_NAME,
    COLORS_SETTINGS_NAME,
    MATERIAL_SETTINGS_NAME,
    MODEL_SETTINGS_NAME,
    CATALOG_SETTINGS_TITLE,
    BUTTON_SETTINGS_SAVE,
    BUTTON_SETTINGS_CANCEL,
} = CATALOG_SETTINGS_DICTIONARY;


const CatalogSettings = () => {

    const { saveSettings } = useCatalogSettings();

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
            element: <ModelSettings/>,
            name: MODEL_SETTINGS_NAME,
        }
    ];


    return(
        <div className={s.CatalogSettings}>
            <div className={s.Way}>Главная &gt; Управление каталогом</div>
            <h2>{CATALOG_SETTINGS_TITLE}</h2>
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
                <ButtonDefault text={BUTTON_SETTINGS_CANCEL}/>
                <ButtonAccent text={BUTTON_SETTINGS_SAVE} onClick={saveSettings}/>
            </div>
        </div>
    );
};

export default withProvider(CatalogSettingsProvider)(CatalogSettings);
