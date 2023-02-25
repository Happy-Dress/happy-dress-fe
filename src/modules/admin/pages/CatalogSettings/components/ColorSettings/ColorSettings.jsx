import React from 'react';
import { useCatalogSettings } from '../../contexts/CatalogSettingsContext/hook/useCatalogSettings';
import SimpleSettingsControl from '../SimpleSettingsControl';

const ColorSettings = () => {
    const { settings: { colors }, updateMaterials } = useCatalogSettings();

    return <SimpleSettingsControl settingsList={colors} updateSettings={updateMaterials} callModalOnAdd={true}/>;
};

export default ColorSettings;
