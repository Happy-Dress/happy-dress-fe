import { createContext } from 'react';

const initialContext = {
    settings: null,
    initialSettings: null,
    updateModels: () => {},
    saveSettings: () => {}
};

export const CatalogSettingsContext = createContext(initialContext);
