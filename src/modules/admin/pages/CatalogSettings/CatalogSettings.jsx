import s from './CatalogSettings.module.scss';
import { CATALOG_SETTINGS_DICTIONARY } from './CatalogSettings.dictionary';
import { ButtonAccent, ButtonDefault } from '../../../../common/ui/components';
import { useCatalogSettings } from './contexts/CatalogSettingsContext/hook/useCatalogSettings';
import CatalogSettingsProvider from './contexts/CatalogSettingsContext/provider/CatalogSettingsProvider';
import withProvider from '../../../../common/ui/hocs/withProvider';
import SettingsDropDown from './components/SettingDropDown';
import ModelSettings from './components/ModelSettings';
import MaterialSettings from './components/MaterialSettings';
import CategorySettings from './components/CategorySettings';
import { useModal } from 'react-modal-hook';
import { LeaveConfirmationDialog } from '../../../../common/ui/components/Dialogs';
import { useToasters } from '../../../../common/ui/contexts/ToastersContext';
import { ColorSettings } from './components/ColorSettings';
import { useBeforeunload } from 'react-beforeunload';
import { Breadcrumbs } from '../../../../common/ui/components/Breadcrumbs';

const {
    CATEGORIES_SETTINGS_NAME,
    COLORS_SETTINGS_NAME,
    MATERIAL_SETTINGS_NAME,
    MODEL_SETTINGS_NAME,
    CATALOG_SETTINGS_TITLE,
    BUTTON_SETTINGS_SAVE,
    BUTTON_SETTINGS_CANCEL,
    CHANGES_RESTORED,
} = CATALOG_SETTINGS_DICTIONARY;


const CatalogSettings = () => {

    const { saveSettings, initialSettings, settings, restoreSettings } = useCatalogSettings();
    const { showToasterNotification } = useToasters();

    const areSettingsChanged = JSON.stringify(settings) !== JSON.stringify(initialSettings);

    useBeforeunload(areSettingsChanged ? (e) => e.preventDefault() : null);

    const restoreCatalogSettings = () =>{
        hideModal();
        restoreSettings(() =>{
            showToasterNotification(CHANGES_RESTORED);
        }, true);

    };

    const [showModal, hideModal] = useModal(() => (
        <LeaveConfirmationDialog onClose={hideModal} onSubmit={restoreCatalogSettings}/>
    ));

    const showCancelConfirmation = () => {
        if(areSettingsChanged) {
            showModal();
        }
    };

    const items = [
        {
            element: <CategorySettings/>,
            name: CATEGORIES_SETTINGS_NAME,
        },
        {
            element: <ColorSettings/>,
            name: COLORS_SETTINGS_NAME,
        },
        {
            element: <MaterialSettings/>,
            name: MATERIAL_SETTINGS_NAME,
        },
        {
            element: <ModelSettings/>,
            name: MODEL_SETTINGS_NAME,
        }
    ];

    const breadcrumbs = [
        { id: 0, link: '/domain/home', linkTitle: 'Главная' },
        { id: 1, disableLink: true, linkTitle: 'Управление каталогом' },
    ];

    return(
        <div className={s.CatalogSettings}>
            <Breadcrumbs breadcrumbs={breadcrumbs}/>
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
                <ButtonDefault disabled={!areSettingsChanged} text={BUTTON_SETTINGS_CANCEL} onClick={showCancelConfirmation}/>
                <ButtonAccent disabled={!areSettingsChanged} text={BUTTON_SETTINGS_SAVE} onClick={saveSettings}/>
            </div>
        </div>
    );
};

export default withProvider(CatalogSettingsProvider)(CatalogSettings);
