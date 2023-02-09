import React, { useEffect, useState } from 'react';
import { ReactComponent as Search } from '../../../assets/images/search.svg';
import s from './SearchBarInput.module.scss';
import { useSearchParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const SearchBarInput = ({ className }) => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [searchBar, setSearchBar] = useState(searchParams.get('search') ?? '');


    useEffect(() => {
        const debouncedTimeout = setTimeout(() => {
            if(searchBar) {
                setSearchParams((prev) => {
                    const newParams = new URLSearchParams(prev);
                    newParams.set('search', searchBar);
                    return newParams;
                });
            } else {
                setSearchParams((prev) => {
                    const newParams = new URLSearchParams(prev);
                    newParams.delete('search');
                    return newParams;
                });
            }
        }, 0);
        return () => {
            clearTimeout(debouncedTimeout);
        };
    }, [searchBar]);

    return (
        <label className={classNames(s.SearchBarInput, className)}>
            <Search id={s.searchIcon}/>
            <input
                type="text"
                placeholder={'Поиск..'}
                value={searchBar}
                onChange={(e) => setSearchBar(e.target.value)}
            />
        </label>
    );
};

SearchBarInput.propTypes = {
    className: PropTypes.string
};

export default SearchBarInput;