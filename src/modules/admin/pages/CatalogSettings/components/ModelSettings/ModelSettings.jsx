import { useCatalogSettings } from '../../contexts/CatalogSettingsContext/hook/useCatalogSettings';
import SimpleSettingsControl from '../SimpleSettingsControl/SimpleSettingsControl';
import React from 'react';

const ModelSettings = () => {
    const { settings: { models }, updateModels } = useCatalogSettings();

    return <SimpleSettingsControl settingsList={models} updateSettings={updateModels}/>;
};

export default ModelSettings;
