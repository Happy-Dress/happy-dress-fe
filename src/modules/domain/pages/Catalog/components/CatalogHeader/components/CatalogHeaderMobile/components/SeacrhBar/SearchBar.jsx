import React from 'react';
import { SearchBarInput } from '../../../../../../../../../../common/ui/components/SeacrhBarInput';
import { ReactComponent as Cross } from '../../../../../../../../../../common/assets/images/x.svg';
import { ReactComponent as Filter } from '../../../../../../../../../../common/assets/images/filter.svg';
import s from './SearchBar.module.scss';
import PropTypes from 'prop-types';

const SearchBar = ({ setIsFiltersOpen, isFiltersOpen }) => {

    return (
        <div className={s.SearchBar}>
            <SearchBarInput className={s.input}/>
            {isFiltersOpen ?
                <Cross id={s.crossIcon} onClick={() => setIsFiltersOpen(false)}/>
                :
                <Filter id={s.filterIcon} onClick={() => setIsFiltersOpen(true)}/>
            }
        </div>
    );
};

SearchBar.propTypes = {
    setIsFiltersOpen: PropTypes.func.isRequired,
    isFiltersOpen: PropTypes.bool.isRequired
};

export default SearchBar;