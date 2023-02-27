import React from 'react';
import { useCatalogSettings } from '../../contexts/CatalogSettingsContext/hook/useCatalogSettings';
import SimpleSettingsControl from '../SimpleSettingsControl';
import { ColorAddDialog } from '../../../../../../common/ui/components/Dialogs';

const ColorSettings = () => {
    const { settings: { colors }, updateColors } = useCatalogSettings();

    return <SimpleSettingsControl
        settingsList={colors}
        updateSettings={updateColors}
        ModalComponent={ColorAddDialog}
    />;
};

export default ColorSettings;
