import { createContext } from 'react';

const initialContext = {
    settings: null,
    initialSettings: null,
    updateModels: () => {},
    updateMaterials: () => {},
    saveSettings: () => {}
};

export const CatalogSettingsContext = createContext(initialContext);
