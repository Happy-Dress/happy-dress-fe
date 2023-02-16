import React from 'react';
import s from './DressCategories.module.scss';
import { useCatalogContext } from '../../contexts/CatalogProvider';
import { CATALOG_ACTIONS } from '../../store/catalogReducer';

const DressCategories = () => {
    const { state, dispatch } = useCatalogContext();

    const isActive = (id) => {
        try {
            return state.currentFilters.categories[0] === id ? s.active : '';
        } catch (e) {
            return '';
        }
    };

    const changeHandler = (id) => {
        dispatch({ type: CATALOG_ACTIONS.REPLACE_CATEGORY, payload: id });
    };

    if(state.loading.header) return;

    return (
        <div className={s.DressCategories}>
            {
                state.filters.categories.map(({ id, name }) => {
                    return <span key={id} className={isActive(id)} onClick={() => changeHandler(id)}>{name}</span>;
                })
            }
        </div>
    );
};

export default DressCategories;
