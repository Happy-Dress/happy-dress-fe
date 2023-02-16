import React, { useEffect, useReducer } from 'react';
import s from './Catalog.module.scss';
import { CatalogProvider } from './contexts/CatalogProvider';
import { catalogReducer } from './store';
import { getCatalogueItems, retrieveCatalogueSettings } from '../../../../common/api';
import { CATALOG_ACTIONS } from './store/catalogReducer';
import { CatalogHeader } from './components/CatalogHeader';
import { useSearchParams } from 'react-router-dom';
import { CATALOG_SETTING_VARIABLES } from './Catalog.dictionary';
import { CatalogContent } from './components/CatalogContent';
import { DressCategories } from './components/DressCategories';
import { useDeviceTypeContext } from '../../../../common/ui/contexts/DeviceType';

const {
    BASE_FILTER_ID
} = CATALOG_SETTING_VARIABLES;

const Catalog = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [state, dispatch] = useReducer(catalogReducer, {
        filters: {},
        loading: {
            header: true,
            content: true
        },
        currentFilters: {}
    });
    const { isMobile } = useDeviceTypeContext();

    useEffect(() => {
        dispatch({ type: CATALOG_ACTIONS.SET_FULL_LOADING });

        if(!searchParams.has('categories')) {                                  // Установка фильтров из строки парметров
            let newFilters = {};

            for(let [key, value] of searchParams.entries()) {
                newFilters[key] = value.split(/,/).map(item => Number(item));
            }

            newFilters.categories = [BASE_FILTER_ID];

            dispatch({ type: CATALOG_ACTIONS.SET_BASE_FILTER, payload: newFilters });
            setSearchParams(() => {
                searchParams.set('categories', BASE_FILTER_ID);

                return searchParams;
            });
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

        getCatalogueItems(searchParams.toString())
            .then((res) => {
                dispatch({ type: CATALOG_ACTIONS.SET_ALL_ITEMS, payload: res });
            });

    }, []);

    const changeFilter = () => {
        function add(id, currentCategory) {
            let prevArray;

            try {
                prevArray = [...state.currentFilters[currentCategory]];
            } catch (e) {
                prevArray = [];
            }

            dispatch({
                type: CATALOG_ACTIONS.UPDATE_CURRENT_FILTER,
                payload: {
                    category: currentCategory,
                    value: [...prevArray, id]
                }
            });
        }

        function remove(id, currentCategory) {
            let newArray = state.currentFilters[currentCategory].filter(item => item !== id);

            if(!newArray.length) {
                let newFilters = { ...state.currentFilters };
                delete newFilters[currentCategory];
                dispatch({
                    type: CATALOG_ACTIONS.REMOVE_CURRENT_FILTER,
                    payload: newFilters
                });
                return;
            }

            dispatch({
                type: CATALOG_ACTIONS.UPDATE_CURRENT_FILTER,
                payload: {
                    category: currentCategory,
                    value: newArray
                }
            });
        }

        function replace(id) {
            dispatch({ type: CATALOG_ACTIONS.REPLACE_CATEGORY, payload: id });
        }

        return {
            add,
            remove,
            replace
        };
    };

    return (
        <CatalogProvider value={{ state, dispatch, changeFilter }}>
            <div className={s.Catalog}>
                <CatalogHeader />
                { !isMobile && <DressCategories /> }
                <CatalogContent />
            </div>
        </CatalogProvider>
    );
};

export default Catalog;
