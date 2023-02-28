import React from 'react';
import s from './SearchBar.module.scss';
import { ReactComponent as Search } from '../../../../../../../../../common/assets/images/search.svg';


const SearchBar = () =>{
    return (
        <label className={s.SearchBar}>
            <Search className={s.SearchBar_searchIcon}/>
            <input
                type="text"
                placeholder={'Поиск..'}
            />
        </label>
    );
};

export default SearchBar;
