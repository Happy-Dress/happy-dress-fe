import { useCatalogSettings } from '../../contexts/CatalogSettingsContext/hook/useCatalogSettings';
import React from 'react';
import CategorySettingsControl from '../CategorySettingsControl';

const CategorySettings = () => {
    const { settings: { categories }, updateCategories } = useCatalogSettings();

    return <CategorySettingsControl settingsList={categories} updateSettings={updateCategories}/>;
};

export default CategorySettings;
