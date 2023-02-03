import { useContext } from 'react';
import { CatalogSettingsContext } from '../CatalogSettingsContext';

export const useCatalogSettings = () => useContext(CatalogSettingsContext);
