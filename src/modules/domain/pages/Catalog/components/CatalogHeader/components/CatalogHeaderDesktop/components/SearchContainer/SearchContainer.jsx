import React from 'react';
import s from './SearchContainer.module.scss';
import { SearchBarInput } from '../../../../../../../../../../common/ui/components/SeacrhBarInput';

const SearchContainer = () => {


    return (
        <div className={s.SearchContainer}>
            <SearchBarInput className={s.input}/>
        </div>
    );
};

export default SearchContainer;
