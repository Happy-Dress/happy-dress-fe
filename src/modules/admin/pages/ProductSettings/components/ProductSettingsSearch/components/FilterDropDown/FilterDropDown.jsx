import React, { useState } from 'react';
import s from './FilterDropdown.module.scss';
import ArrowDown from '../../../../../../../../common/assets/images/arrowDown.svg';
import FilterOption from './FilterOption';
import PropTypes from 'prop-types';
import useOutsideClick from '../../../../../../../../common/ui/hooks/useOutsideClick';


const FilterDropdown = ({ name, options, selectedOptionIds, renderOption, onSelect, onUnSelect }) => {

    const [isOpen, setIsOpen] = useState(false);
    const outsideClickRef = useOutsideClick(() => setIsOpen(false));

    return (
        <div className={s.FilterDropdown} ref={outsideClickRef}>
            <div 
                className={s.currentFilter}
                onClick={() => setIsOpen(!isOpen)} 
                data-testid={'current-filter'}
            >
                <p>{name}</p>
                <ArrowDown className={isOpen ? s.active : ''}/>
            </div>
            <div 
                className={s.options}
                style={{ height: isOpen ? `calc(60px * ${options.length})` : '0' }}
                data-testid={'options'}
            >
                {
                    options.map(item => {
                        return <FilterOption
                            onUnselect={onUnSelect}
                            onSelect={onSelect}
                            key={item.id}
                            item={item}
                            isChecked={selectedOptionIds.includes(item.id)}
                            renderOption={renderOption}
                        />;
                    })
                }
            </div>
        </div>
    );
};

FilterDropdown.propTypes = {
    name: PropTypes.string.isRequired,
    options: PropTypes.array.isRequired,
    renderOption: PropTypes.func.isRequired,
    onSelect: PropTypes.func.isRequired,
    onUnSelect: PropTypes.func.isRequired,
    selectedOptionIds: PropTypes.array.isRequired

};

export default FilterDropdown;
