import React from 'react';
import s from './Filters.module.scss';
import { useCatalogContext } from '../../../../../../contexts/CatalogProvider';
import { DropdownSelectList } from '../../../../../../../../../../common/ui/components/Dropdowns';
import { ROUTER_VARIABLES } from '../../../../../../../../adminRoutes';

const Filters = () => {
    const { state, changeFilter } = useCatalogContext();

    return (
        <div className={s.Filters}>
            {
                Object.entries(state.filters).map(([key, values]) => {
                    if(key === ROUTER_VARIABLES.BASE_GOODS_FILTER.name) return;
                    return <DropdownSelectList
                        key={key}
                        currentCategory={key}
                        options={values}
                        selectedItems={state.currentFilters[key] ?? []}
                        changeFilter={changeFilter}
                        className={s.dropdown}
                        optionsClass={s.options}
                        currentFilterClass={s.currentFilter}
                    />;
                })
            }
        </div>
    );
};

export default Filters;
