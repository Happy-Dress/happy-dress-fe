import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCatalogueSettings } from '../../../../common/ui/store/slices/catalogueSettingsSlice';
import ProductsList from './components/ProductsList';
import { fetchCatalogueItems, resetProducts } from '../../../../common/ui/store/slices/productsSearchSlice';
import CatalogSearch from './components/CatalogSearch';
import s from './Catalog.module.scss';
import { DressCategories } from './components/DressCategories';
import { useDeviceTypeContext } from '../../../../common/ui/contexts/DeviceType';

const Catalog = () =>{
    const { isDesktop } = useDeviceTypeContext();
    const dispatch = useDispatch();
    const catalogueSettings = useSelector(state => state.productsSearch.filters);

    useEffect(() =>{
        if(catalogueSettings.categoryId){
            dispatch(resetProducts());
            dispatch(fetchCatalogueItems(catalogueSettings));
        }
    }, [catalogueSettings]);

    useEffect(() =>{
        dispatch(fetchCatalogueSettings());
    }, []);

    return (
        <div className={s.Catalog}>
            <CatalogSearch/>
            { isDesktop && <DressCategories /> }
            <ProductsList/>
        </div>
    );
};

export default Catalog;
