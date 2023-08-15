import React from 'react';
import s from './SearchBar.module.scss';
import { ReactComponent as Search } from '../../../../../../../../../common/assets/images/search.svg';
import { DebounceInput } from 'react-debounce-input';
import { useDispatch, useSelector } from 'react-redux';
import { setName } from '../../../../../../../../../common/ui/store/slices/productsSearchSlice';


const SearchBar = () => {

    const dispatch = useDispatch();
    const value = useSelector(state => state.productsSearch.filters.name);

    const updateSearch = (searchValue) =>{
        dispatch(setName(searchValue));
    };

    return (
        <label className={s.SearchBar}>
            <Search className={s.SearchBar_searchIcon}/>
            <DebounceInput
                placeholder={'Поиск'}
                value={value}
                debounceTimeout={300}
                onChange={event => updateSearch(event.target.value )} />
        </label>
    );
};

export default SearchBar;
