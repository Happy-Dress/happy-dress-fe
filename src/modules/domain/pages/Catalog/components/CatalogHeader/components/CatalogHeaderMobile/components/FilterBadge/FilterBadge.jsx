import React from 'react';
import s from './FilterBadge.module.scss';
import PropTypes from 'prop-types';

const FilterBadge = ({ name }) => {

    if(!name) return;

    return (
        <div className={s.FilterBadge}>
            {name}
        </div>
    );
};

FilterBadge.propTypes = {
    name: PropTypes.string.isRequired
};

export default FilterBadge;
