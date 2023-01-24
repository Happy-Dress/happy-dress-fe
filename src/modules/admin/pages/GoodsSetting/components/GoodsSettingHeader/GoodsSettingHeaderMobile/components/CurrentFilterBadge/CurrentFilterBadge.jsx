import React from 'react';
import s from './CurrentFilterBadge.module.scss';
import { ReactComponent as Cross } from '../../../../../../../../../common/assets/images/x.svg';
import PropTypes from 'prop-types';
import { useSearchParams } from 'react-router-dom';

const CurrentFilterBadge = ({ filters, itemId, itemCategory }) => {

    const [searchParams, setSearchParams] = useSearchParams();

    if(!itemId) return;

    const filterName = () => {
        try {
            return filters[itemCategory].filter(obj => String(obj.id) === itemId)[0].name;
        } catch (e) {
            return '';
        }
    };

    if(!filterName()) return;


    const deleteHandler = () => {
        setSearchParams(prev => {
            const newState = prev;
            const newItems = prev.get(itemCategory).split(',').filter(item => item !== itemId).join(',');
            if(!newItems) {
                newState.delete(itemCategory);
                return newState.toString();
            }
            newState.set(itemCategory, newItems);
            return newState.toString();
        });
    };

    return (
        <div className={s.CurrentFiltersItem}>
            <p>{filterName()}</p>
            <Cross onClick={deleteHandler}/>
        </div>
    );
};

CurrentFilterBadge.propTypes = {
    filters: PropTypes.object.isRequired,
    itemId: PropTypes.string.isRequired,
    itemCategory: PropTypes.string.isRequired
};

export default CurrentFilterBadge;