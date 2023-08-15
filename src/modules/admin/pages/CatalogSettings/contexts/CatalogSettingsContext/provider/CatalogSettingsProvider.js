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
    const [onSaveActions, setOnSaveActions] = useState([]);
    const { showToasterSuccess, showToasterError } = useToasters();

    const [catalogSettings, setCatalogSettings] = useState({
        models: [],
        materials: [],
        categories: [],
        colors: []
    });

    const restoreSettings = (afterRestore, isSecure) => {
        retrieveCatalogueSettings(isSecure).then((settings) => {
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


    const updateCategories = (categories) => {
        setCatalogSettings(prevState => ({ ...prevState, categories }));
    };

    const updateColors = (colors) => {
        setCatalogSettings(prevState => ({ ...prevState, colors }));
    };

    const registerOnSaveAction = (action) =>{
        setOnSaveActions((actions) => [...actions, action] );
    };

    const saveSettings = () => {
        const settingsToSave = JSON.parse(JSON.stringify(catalogSettings));

        settingsToSave.materials = settingsToSave.materials.map((material, index) => ({ ...material, orderNumber: index + 1 }));
        settingsToSave.models = settingsToSave.models.map((model, index) => ({ ...model, orderNumber: index + 1 }));
        settingsToSave.categories = settingsToSave.categories.map((category, index) => ({ ...category, orderNumber: index + 1 }));
        settingsToSave.colors = settingsToSave.colors.map((color, index) => ({ ...color, orderNumber: index + 1 }));
        settingsToSave.sizes = settingsToSave.sizes.map((size, index) => ({ ...size, orderNumber: index + 1 }));

        updateSettings(settingsToSave).then(settings => {
            onSaveActions.forEach((action) => action());
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
            updateCategories,
            updateColors,
            saveSettings,
            initialSettings: initialCatalogSettings,
            restoreSettings,
            registerOnSaveAction
        }}>
            {props.children}
        </CatalogSettingsContext.Provider>
    );

};

CatalogSettingsProvider.propTypes = {
    children: PropTypes.element
};

export default CatalogSettingsProvider;
