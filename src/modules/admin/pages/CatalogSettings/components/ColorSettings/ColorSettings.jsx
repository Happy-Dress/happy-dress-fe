import React from 'react';
import { useCatalogSettings } from '../../contexts/CatalogSettingsContext/hook/useCatalogSettings';
import SimpleSettingsControl from '../SimpleSettingsControl';

const ColorSettings = () => {
    const { settings: { colors }, updateColors } = useCatalogSettings();

    return <SimpleSettingsControl settingsList={colors} updateSettings={updateColors} callModalOnAdd={true}/>;
};

export default ColorSettings;
