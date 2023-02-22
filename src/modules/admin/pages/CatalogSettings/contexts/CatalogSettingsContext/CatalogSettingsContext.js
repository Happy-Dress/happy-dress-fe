import { createContext } from 'react';

const initialContext = {
    settings: null,
    initialSettings: null,
    updateModels: () => {},
    updateMaterials: () => {},
    saveSettings: () => {},
    restoreSettings: () => {},
};

export const CatalogSettingsContext = createContext(initialContext);
