import React from 'react';
import s from './Filters.module.scss';
import { useCatalogContext } from '../../../../../../contexts/CatalogProvider';
import { ButtonAccent } from '../../../../../../../../../../common/ui/components';
import { CATALOG_SETTING_DICTIONARY } from '../../../../../../Catalog.dictionary';
import { DropdownSelectList } from '../../../../../../../../../../common/ui/components/Dropdowns';
import PropTypes from 'prop-types';

const {
    ACCEPT_FILTERS
} = CATALOG_SETTING_DICTIONARY;

const Filters = ({ applyFilters }) => {
    const { state, changeFilter } = useCatalogContext();

    return (
        <div className={s.Filters}>
            {
                Object.entries(state.filters).map(([key, values]) => {
                    return <DropdownSelectList
                        key={key}
                        currentCategory={key}
                        options={values}
                        selectedItems={state.currentFilters[key] ?? []}
                        changeFilter={changeFilter}
                        className={s.dropdown}
                        isOptionsAbsolute={false}
                        isSingleOptionOnly={key === 'categories'}
                    />;
                })
            }
            <ButtonAccent text={ACCEPT_FILTERS} onClick={applyFilters}/>
        </div>
    );
};

Filters.propTypes = {
    applyFilters: PropTypes.func.isRequired
};

export default Filters;
