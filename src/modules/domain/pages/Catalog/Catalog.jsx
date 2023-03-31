import React from 'react';
import ProductsList from './components/ProductsList';
import CatalogSearch from './components/CatalogSearch';
import s from './Catalog.module.scss';
import { DressCategories } from './components/DressCategories';
import { useDeviceTypeContext } from '../../../../common/ui/contexts/DeviceType';
import { useCatalogFilters } from '../../../../common/ui/hooks/useCatalogFilters';

const Catalog = () =>{
    const { isDesktop } = useDeviceTypeContext();
    useCatalogFilters();

    return (
        <div className={s.Catalog}>
            <CatalogSearch/>
            { isDesktop && <DressCategories /> }
            <ProductsList/>
        </div>
    );
};

export default Catalog;
