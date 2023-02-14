import React from 'react';
import s from './Filters.module.scss';
import { useCatalogContext } from '../../../../../CatalogProvider';
import { DropdownSelectList } from '../../../../../../../../../../common/ui/components/Dropdowns';
import { CATALOG_ACTIONS } from '../../../../../../store/catalogReducer';

const Filters = () => {
    const { state, dispatch } = useCatalogContext();

    const changeFilters = () => {
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

        return {
            add,
            remove
        };
    };

    return (
        <div className={s.Filters}>
            {
                Object.entries(state.filters).map(([key, values]) => {
                    return <DropdownSelectList
                        key={key}
                        currentCategory={key}
                        options={values}
                        selectedItems={state.currentFilters[key] ?? []}
                        changeFilter={changeFilters}
                        className={s.dropdown}
                    />;
                })
            }
        </div>
    );
};

export default Filters;
