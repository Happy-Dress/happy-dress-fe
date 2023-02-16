import React from 'react';
import s from './SearchContainer.module.scss';
import { SearchBarInput } from '../../../../../../../../../../common/ui/components/SeacrhBarInput';
import { ReactComponent as Filter } from '../../../../../../../../../../common/assets/images/filter.svg';
import PropTypes from 'prop-types';

const SearchContainer = ({ setIsOpen }) => {
    return (
        <div className={s.SearchContainer}>
            <SearchBarInput className={s.input}/>
            <Filter onClick={() => setIsOpen(prev => !prev)} id={s.filter}/>
        </div>
    );
};

SearchContainer.propTypes = {
    setIsOpen: PropTypes.func.isRequired
};

export default SearchContainer;
