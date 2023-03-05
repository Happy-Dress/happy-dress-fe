import { useCatalogSettings } from '../../contexts/CatalogSettingsContext/hook/useCatalogSettings';
import React from 'react';
import CategorySettingsControl from '../CategorySettingsControl';
import CategoryDialog from '../../../../../../common/ui/components/Dialogs/CategoryDialog';

const CategorySettings = () => {
    const { settings: { categories }, updateCategories } = useCatalogSettings();

    return <CategorySettingsControl
        settingsList={categories}
        updateSettings={updateCategories}
        ModalComponent={CategoryDialog}
    />;
};

export default CategorySettings;
