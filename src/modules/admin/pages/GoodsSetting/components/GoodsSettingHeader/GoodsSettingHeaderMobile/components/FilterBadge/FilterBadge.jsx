import React from 'react';
import s from './FilterBadge.module.scss';
import PropTypes from 'prop-types';

const FilterBadge = ({ filters, itemId, itemCategory }) => {

    if(!itemId) return;

    const filterName = () => {
        try {
            return filters[itemCategory].filter(obj => String(obj.id) === itemId)[0].name;
        } catch (e) {
            return '';
        }
    };

    if(!filterName()) return;

    return (
        <div className={s.FilterBadge}>
            <p>{filterName()}</p>
        </div>
    );
};

FilterBadge.propTypes = {
    filters: PropTypes.object.isRequired,
    itemId: PropTypes.string.isRequired,
    itemCategory: PropTypes.string.isRequired
};

export default FilterBadge;