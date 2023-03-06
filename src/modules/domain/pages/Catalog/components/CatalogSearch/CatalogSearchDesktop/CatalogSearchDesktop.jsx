import React from 'react';
import s from './CatalogSearchDesktop.module.scss';
import SearchBar from '../components/SearchBar/SearchBar';
import DetailedSearch from '../components/DetailedSearch/DetailedSearch';

const CatalogSearchDesktop = () => {

    return (
        <div className={s.CatalogSearchDesktop}>
            <div className={s.CatalogSearchDesktop_searchBarWrapper}>
                <div className={s.detailedSearch}>
                    <div className={s.detailedSearch_dropdownsWrapper}>
                        <DetailedSearch />
                    </div>
                    <SearchBar/>
                </div>
            </div>
        </div>
    );
};

export default CatalogSearchDesktop;
