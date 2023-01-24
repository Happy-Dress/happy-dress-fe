import React, { useState } from 'react';
import s from './SearchBar.module.scss';
import { ReactComponent as Search } from '../../../../../../../../../common/assets/images/search.svg';
import { ReactComponent as Cross } from '../../../../../../../../../common/assets/images/x.svg';
import { ReactComponent as Filter } from '../../../../../../../../../common/assets/images/filter.svg';
import PropTypes from 'prop-types';

const SearchBar = ({ setIsFiltersOpen, isFiltersOpen }) => {

    const [searchBar, setSearchBar] = useState('');

    return (
        <div className={s.SearchBar}>
            <label>
                <Search id={s.searchIcon}/>
                <input
                    type="text"
                    placeholder={'Поиск..'}
                    value={searchBar}
                    onChange={(e) => setSearchBar(e.target.value)}
                />
            </label>
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