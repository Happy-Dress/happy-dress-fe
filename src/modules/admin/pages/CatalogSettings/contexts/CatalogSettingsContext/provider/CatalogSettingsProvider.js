import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { CatalogSettingsContext } from '../CatalogSettingsContext';
import { retrieveCatalogueSettings } from '../../../../../../../common/api';
import { useToasters } from '../../../../../../../common/ui/contexts/ToastersContext';
import updateSettings from '../../../../../api/updateSettings';
import { CATALOG_SETTINGS_DICTIONARY } from '../../../CatalogSettings.dictionary';


const {
    SETTINGS_UPDATED,
} = CATALOG_SETTINGS_DICTIONARY;

const CatalogSettingsProvider = (props) => {

    const [initialCatalogSettings, setInitialCatalogSettings] = useState();
    const { showToasterSuccess, showToasterError } = useToasters();

    const [catalogSettings, setCatalogSettings] = useState({
        models: [],
        materials: [],
        colors: []
    });

    const restoreSettings = (afterRestore) => {
        retrieveCatalogueSettings().then((settings) => {
            setInitialCatalogSettings(settings);
            setCatalogSettings(settings);
            afterRestore();
        });
    };

    useEffect(() => {
        retrieveCatalogueSettings().then((settings) => {
            setInitialCatalogSettings(settings);
            setCatalogSettings(settings);
        });
    }, []);

    const updateModels = (models) => {
        setCatalogSettings(prevState => ({ ...prevState, models }));
    };

    const updateMaterials = (materials) => {
        setCatalogSettings(prevState => ({ ...prevState, materials }));
    };

    const updateColors = (colors) => {
        setCatalogSettings(prevState => ({ ...prevState, colors  }));
    };

    const saveSettings = () => {
        const settingsToSave = JSON.parse(JSON.stringify(catalogSettings));
        settingsToSave.models = settingsToSave.models.map((model, index) => ({ ...model, orderNumber: index }));
        settingsToSave.materials = settingsToSave.materials.map((material, index) => ({
            ...material,
            orderNumber: index
        }));
        updateSettings(settingsToSave).then(settings => {
            showToasterSuccess(SETTINGS_UPDATED);
            setInitialCatalogSettings(settings);
            setCatalogSettings(settings);
        }).catch(e => {
            showToasterError(e);
        });
    };


    return (
        <CatalogSettingsContext.Provider value={{
            settings: catalogSettings,
            updateModels,
            updateMaterials,
            updateColors,
            saveSettings,
            initialSettings: initialCatalogSettings,
            restoreSettings
        }}>
            {props.children}
        </CatalogSettingsContext.Provider>
    );

};

CatalogSettingsProvider.propTypes = {
    children: PropTypes.element
};

export default CatalogSettingsProvider;
