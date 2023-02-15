import React from 'react';
import s from './Filters.module.scss';
import { useCatalogContext } from '../../../../../CatalogProvider';
import { DropdownSelectList } from '../../../../../../../../../../common/ui/components/Dropdowns';

const Filters = () => {
    const { state, changeFilter } = useCatalogContext();

    return (
        <div className={s.Filters}>
            {
                Object.entries(state.filters).map(([key, values]) => {
                    if(key === 'categories') return;
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
