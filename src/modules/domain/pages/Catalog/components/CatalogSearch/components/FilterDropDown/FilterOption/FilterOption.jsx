import React from 'react';
import s from './FilterOption.module.scss';
import Checkbox from '../../../../../../../../../common/assets/images/checkbox.svg';
import PropTypes from 'prop-types';

const FilterOption = ({ item, isChecked, renderOption, onSelect, onUnselect }) => {

    const handleClick = () => {
        isChecked ? onUnselect(item.id) :onSelect(item.id);
    };


    return (
        <div className={s.optionsItem}>
            <label >
                <input
                    type="checkbox"
                    checked={isChecked}
                    placeholder={'checkbox'}
                    onChange={handleClick}
                />
                {isChecked ? <Checkbox className={s.checkbox} /> :
                    <span className={s.empty}/> }
                {renderOption(item)}
            </label>
        </div>
    );
};

FilterOption.propTypes = {
    item: PropTypes.object.isRequired,
    isChecked: PropTypes.bool.isRequired,
    renderOption: PropTypes.func.isRequired,
    onSelect: PropTypes.func.isRequired,
    onUnselect: PropTypes.func.isRequired
};

export default FilterOption;
