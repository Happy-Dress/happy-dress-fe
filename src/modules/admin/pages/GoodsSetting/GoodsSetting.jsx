import React, { useEffect, useReducer } from 'react';
import s from './GoodsSetting.module.scss';
import { CatalogProvider } from './components/CatalogProvider';
import { catalogReducer } from './store';
import { retrieveCatalogueSettings } from '../../../../common/api';
import { CATALOG_ACTIONS } from './store/catalogReducer';
import { GoodsSettingHeader } from './components/GoodsSettingHeader';
import { useDeviceTypeContext } from '../../../../common/ui/contexts/DeviceType';
import { useSearchParams } from 'react-router-dom';

const GoodsSetting = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [state, dispatch] = useReducer(catalogReducer, {
        filters: {},
        loading: true,
        currentFilters: {}
    });
    const { isMobile } = useDeviceTypeContext();

    useEffect(() => {
        dispatch({ type: CATALOG_ACTIONS.SET_LOADING });

        if(!searchParams.has('categories')) {
            let newFilters = {};

            for(let [key, value] of searchParams.entries()) {
                newFilters[key] = value.split(/,/).map(item => Number(item));
            }

            newFilters.categories = [84];

            dispatch({ type: CATALOG_ACTIONS.SET_BASE_FILTER, payload: newFilters });
        } else {
            let newFilters = {};

            for(let [key, value] of searchParams.entries()) {
                newFilters[key] = value.split(/,/).map(item => Number(item));
            }

            dispatch({ type: CATALOG_ACTIONS.SET_BASE_FILTER, payload: newFilters });
        }

        retrieveCatalogueSettings()
            .then((res) => {
                dispatch({ type: CATALOG_ACTIONS.SET_ALL_FILTERS, payload: res });
            });

    }, []);

    useEffect(() => {
        if(isMobile) return;

        setSearchParams(() => {
            const newParams = new URLSearchParams(state.currentFilters);
            if(searchParams.get('search')) {
                newParams.set('search', searchParams.get('search'));
            }

            return newParams.toString();
        });
    }, [state.currentFilters]);

    if(state.loading) return <p>Loading</p>;

    return (
        <CatalogProvider value={{ state, dispatch }}>
            <div className={s.GoodsSetting}>
                <GoodsSettingHeader />
            </div>
        </CatalogProvider>
    );
};

export default GoodsSetting;
