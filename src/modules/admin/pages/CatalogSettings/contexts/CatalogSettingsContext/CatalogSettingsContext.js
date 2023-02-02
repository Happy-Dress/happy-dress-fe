import { createContext } from 'react';

const initialContext = {
    settings: null,
    updateModels: () => {},
    saveSettings: () => {}
};

export const CatalogSettingsContext = createContext(initialContext);
