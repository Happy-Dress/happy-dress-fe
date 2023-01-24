import React, { useEffect, useState } from 'react';
import s from './FilterOption.module.scss';
import { ReactComponent as Checkbox } from '../../../../../../../../../../common/assets/images/checkbox.svg';
import PropTypes from 'prop-types';

const FilterOption = ({ item, changeFilter, isChecked: check }) => {
    const [isChecked, setIsChecked] = useState(check);

    const changeHandler = () => {
        if(isChecked) {
            changeFilter(String(item.id), 'remove');
            setIsChecked(false);
        } else {
            changeFilter(String(item.id), 'add');
            setIsChecked(true);
        }
    };

    useEffect(() => {
        setIsChecked(check);
    }, [check]);

    return (
        <div className={s.optionsItem}>
            <label>
                <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={changeHandler}
                    placeholder={'checkbox'}
                />
                {isChecked ? <Checkbox class={s.checkbox}/> : <span className={s.empty}/>}
                <p>{item.name}</p>
            </label>
        </div>
    );
};

FilterOption.propTypes = {
    item: PropTypes.object.isRequired,
    changeFilter: PropTypes.func.isRequired,
    isChecked: PropTypes.bool.isRequired
};

export default FilterOption;