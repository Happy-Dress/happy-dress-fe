import React, { useState } from 'react';
import s from './FilterDropdown.module.scss';
import ArrowDown from '../../../../../../../../common/assets/images/arrowDown.svg';
import FilterOption from './FilterOption';
import PropTypes from 'prop-types';
import useOutsideClick from '../../../../../../../../common/ui/hooks/useOutsideClick';
import classNames from 'classnames';


const FilterDropdown = ({ name, options, selectedOptionIds, renderOption, onSelect, onUnSelect, className }) => {

    const [isOpen, setIsOpen] = useState(false);
    const outsideClickRef = useOutsideClick(() => setIsOpen(false));

    return (
        <div className={classNames(s.FilterDropdown, className)} ref={outsideClickRef}>
            <div className={s.currentFilter} onClick={() => setIsOpen(!isOpen)} >
                <p>{name}</p>
                <ArrowDown className={isOpen ? s.active : ''}/>
            </div>
            <div className={s.options} style={{ height: isOpen ? `calc(60px * ${options.length})` : '0' }}>
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
    selectedOptionIds: PropTypes.array.isRequired,
    className: PropTypes.string

};

export default FilterDropdown;
