import React from 'react';
import s from './FilterBadge.module.scss';
import PropTypes from 'prop-types';
import { ReactComponent as Cross } from '../../../../../../../../../../common/assets/images/x.svg';
import { useCatalogContext } from '../../../../../../contexts/CatalogProvider';

const FilterBadge = ({ name, id, currentCategory }) => {

    const { changeFilter } = useCatalogContext();

    if(!name) return;

    const clickHandler = () => {
        const { remove } = changeFilter();

        remove(id, currentCategory);
    };

    return (
        <div className={s.FilterBadge}>
            {name}
            <Cross id={s.cross} onClick={clickHandler}/>
        </div>
    );
};

FilterBadge.propTypes = {
    name: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
    currentCategory: PropTypes.string.isRequired
};

export default FilterBadge;
