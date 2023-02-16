import { CatalogContext } from './CatalogProvider';
import { useContext } from 'react';

export const useCatalogContext = () => {
    const data = useContext(CatalogContext);

    if(!data) {
        throw new Error('Can not use `useCatalogContext` outside `CatalogProvider`');
    }

    return data;
};
