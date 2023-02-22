import { useCatalogSettings } from '../../contexts/CatalogSettingsContext/hook/useCatalogSettings';
import SimpleSettingsControl from '../SimpleSettingsControl/SimpleSettingsControl';
import React from 'react';

const CategorySettings = () => {
    const { settings: { categories }, updateCategories } = useCatalogSettings();

    return <SimpleSettingsControl settingsList={categories} updateSettings={updateCategories}/>;
};

export default CategorySettings;
