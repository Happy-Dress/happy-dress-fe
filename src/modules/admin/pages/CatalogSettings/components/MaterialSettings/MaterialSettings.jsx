import { useCatalogSettings } from '../../contexts/CatalogSettingsContext/hook/useCatalogSettings';
import SimpleSettingsControl from '../SimpleSettingsControl/SimpleSettingsControl';
import React from 'react';

const MaterialSettings = () => {
    const { settings: { materials }, updateMaterials } = useCatalogSettings();

    return <SimpleSettingsControl settingsList={materials} updateSettings={updateMaterials}/>;
};

export default MaterialSettings;
