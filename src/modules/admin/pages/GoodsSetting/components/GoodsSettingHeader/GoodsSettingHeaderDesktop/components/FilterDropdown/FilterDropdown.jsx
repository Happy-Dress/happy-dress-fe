import React, { useState } from 'react';
import s from './FilterDropdown.module.scss';
import { ReactComponent as ArrowDown } from '../../../../../../../../../common/assets/images/arrowDown.svg';
import FilterOption from './FilterOption';
import PropTypes from 'prop-types';
import { formatFiltersName } from '../../../../../helpers/formatFiltersName';

const FilterDropdown = ({ name, options, setCurrentFilters, currentFilters }) => {
    const [isOpen, setIsOpen] = useState(false);

    const changeFilter = (id, type) => {
        setCurrentFilters(prevState => {
            const newState = { ...prevState };
            if(!newState[name]) {
                newState[name] = String(id);
                return newState;
            }
            if(type === 'add') {
                newState[name] += `,${id}`;
            }
            if(type === 'remove') {
                newState[name] = newState[name].split(',').filter(item => item !== id).join(',');
            }
            if(!newState[name].length) {
                delete newState[name];
            }
            return newState;
        });
    };

    return (
        <div className={s.FilterDropdown}>
            <div className={s.currentFilter} onClick={() => setIsOpen(!isOpen)}>
                <p>{formatFiltersName(name)}</p>
                <ArrowDown className={isOpen ? s.active : ''}/>
            </div>
            <div className={s.options} style={{ display: isOpen ? 'block' : 'none' }}>
                {
                    options.map(item => {
                        return <FilterOption key={item.id} item={item} changeFilter={changeFilter} isChecked={currentFilters[name] ? currentFilters[name].split(',').includes(String(item.id)) : false}/>;
                    })
                }
            </div>
        </div>
    );
};

FilterDropdown.propTypes = {
    name: PropTypes.string.isRequired,
    options: PropTypes.array.isRequired,
    setCurrentFilters: PropTypes.func.isRequired,
    currentFilters: PropTypes.object.isRequired
};

export default FilterDropdown;