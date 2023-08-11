import { useCatalogSettings } from '../../contexts/CatalogSettingsContext/hook/useCatalogSettings';
import React from 'react';
import CategoryDialog from '../../../../../../common/ui/components/Dialogs/CategoryDialog';
import SimpleSettingsControl from '../SimpleSettingsControl';

const CategorySettings = () => {
    const { settings: { categories }, updateCategories } = useCatalogSettings();

    return <SimpleSettingsControl
        settingsList={categories}
        updateSettings={updateCategories}
        ModalComponent={CategoryDialog}
    />;
};

export default CategorySettings;
