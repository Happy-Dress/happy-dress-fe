import React, { useEffect, useReducer } from 'react';
import s from './GoodsSetting.module.scss';
import { CatalogProvider } from './components/CatalogProvider';
import { catalogReducer } from './store';
import { getCatalogueItems, retrieveCatalogueSettings } from '../../../../common/api';
import { CATALOG_ACTIONS } from './store/catalogReducer';
import { GoodsSettingHeader } from './components/GoodsSettingHeader';
import { useSearchParams } from 'react-router-dom';
import { GOODS_SETTING_VARIABLES } from './GoodsSetting.dictionary';
import { GoodsSettingContent } from './components/GoodsSettingContent';

const {
    BASE_FILTER_ID
} = GOODS_SETTING_VARIABLES;

const GoodsSetting = () => {
    const [searchParams] = useSearchParams();
    const [state, dispatch] = useReducer(catalogReducer, {
        filters: {},
        loading: {
            header: true,
            content: true
        },
        currentFilters: {},
        selectedItems: []
    });

    useEffect(() => {
        dispatch({ type: CATALOG_ACTIONS.SET_FULL_LOADING });

        if(!searchParams.has('categories')) {                                  // Установка фильтров из строки парметров
            let newFilters = {};

            for(let [key, value] of searchParams.entries()) {
                newFilters[key] = value.split(/,/).map(item => Number(item));
            }

            newFilters.categories = [BASE_FILTER_ID];

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
            <div className={s.GoodsSetting}>
                <GoodsSettingHeader />
                <GoodsSettingContent />
            </div>
        </CatalogProvider>
    );
};

export default GoodsSetting;
