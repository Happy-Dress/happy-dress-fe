import React from 'react';
import s from './FilterBadge.module.scss';
import { ReactComponent as Cross } from '../../../../../../../../../common/assets/images/x.svg';
import PropTypes from 'prop-types';

const FilterBadge = ({ filters, itemId, itemCategory, setCurrentFilters }) => {

    if(!itemId) return;

    const deleteHandler = () => {
        setCurrentFilters(prevState => {
            const newState = { ...prevState };
            if(newState[itemCategory].split(',').length === 1) {
                delete newState[itemCategory];
                return newState;
            }
            newState[itemCategory] = newState[itemCategory].split(',').filter(item => item !== itemId).join(',');

            return newState;
        });
    };

    return (
        <div className={s.FilterBadge}>
            <p>{filters[itemCategory].filter(obj => obj.id === Number(itemId))[0].name}</p>
            <Cross onClick={deleteHandler}/>
        </div>
    );
};

FilterBadge.propTypes = {
    filters: PropTypes.object.isRequired,
    itemId: PropTypes.string.isRequired,
    itemCategory: PropTypes.string.isRequired,
    setCurrentFilters: PropTypes.func.isRequired
};

export default FilterBadge;