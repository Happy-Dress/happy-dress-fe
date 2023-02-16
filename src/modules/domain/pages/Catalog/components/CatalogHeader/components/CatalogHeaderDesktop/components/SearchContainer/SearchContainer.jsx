import React from 'react';
import s from './SearchContainer.module.scss';
import { SearchBarInput } from '../../../../../../../../../../common/ui/components/SeacrhBarInput';
import { ReactComponent as Filter } from '../../../../../../../../../../common/assets/images/filter.svg';
import { ReactComponent as Cross } from '../../../../../../../../../../common/assets/images/x.svg';
import PropTypes from 'prop-types';

const SearchContainer = ({ setIsOpen, isOpen }) => {

    const clickHandler = () => {
        setIsOpen(prevState => !prevState);
    };

    return (
        <div className={s.SearchContainer}>
            <SearchBarInput className={s.input}/>
            {isOpen ? <Cross onClick={clickHandler} className={s.filter}/> : <Filter onClick={clickHandler} className={s.filter}/>}
        </div>
    );
};

SearchContainer.propTypes = {
    setIsOpen: PropTypes.func.isRequired,
    isOpen: PropTypes.bool.isRequired
};

export default SearchContainer;
