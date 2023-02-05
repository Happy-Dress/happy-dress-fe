import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { CatalogSettingsContext } from '../CatalogSettingsContext';
import { retrieveCatalogueSettings } from '../../../../../../../common/api';
import { useToasters } from '../../../../../../../common/ui/contexts/ToastersContext';
import updateSettings from '../../../../../api/updateSettings';

const CatalogSettingsProvider = (props) => {

    const [initialCatalogSettings, setInitialCatalogSettings] = useState();
    const { showToasterSuccess, showToasterError } = useToasters();

    const [catalogSettings, setCatalogSettings] = useState({
        models: []
    });

    useEffect(() =>{
        retrieveCatalogueSettings().then((settings) =>{
            setInitialCatalogSettings(settings);
            setCatalogSettings(settings);
        });
    }, []);

    const updateModels = (models) =>{
        setCatalogSettings(prevState => ({ ...prevState, models }));
    };

    const saveSettings = () => {
        const settingsToSave = JSON.parse(JSON.stringify(catalogSettings));
        settingsToSave.models = settingsToSave.models.map( (model, index) => ({ ...model, orderNumber: index }));
        updateSettings(settingsToSave).then(settings => {
            showToasterSuccess('Настройки обновлны');
            setInitialCatalogSettings(settings);
            setCatalogSettings(settings);
        }).catch(e =>{
            showToasterError(e);
        });
    };


    return (
        <CatalogSettingsContext.Provider value={{ settings: catalogSettings, updateModels, saveSettings, initialSettings: initialCatalogSettings }}>
            {props.children}
        </CatalogSettingsContext.Provider>
    );

};

CatalogSettingsProvider.propTypes = {
    children: PropTypes.element
};

export default CatalogSettingsProvider;