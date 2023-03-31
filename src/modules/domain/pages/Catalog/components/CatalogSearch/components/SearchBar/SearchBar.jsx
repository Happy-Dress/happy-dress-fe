import React from 'react';
import s from './SearchBar.module.scss';
import { ReactComponent as Search } from '../../../../../../../../common/assets/images/search.svg';
import { useDispatch } from 'react-redux';
import { setName } from '../../../../../../../../common/ui/store/slices/productsSearchSlice';
import { DebounceInput } from 'react-debounce-input';


const SearchBar = () =>{

    const dispatch = useDispatch();

    const updateSearch = (searchValue) =>{
        dispatch(setName(searchValue));
    };

    return (
        <label className={s.SearchBar}>
            <Search className={s.SearchBar_searchIcon}/>
            <DebounceInput
                placeholder={'Поиск'}
                debounceTimeout={300}
                onChange={event => updateSearch(event.target.value )} />
        </label>
    );
};

export default SearchBar;
