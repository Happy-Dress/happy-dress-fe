import React, { useState } from 'react';
import s from './FilterOption.module.scss';
import { ReactComponent as Checkbox } from '../../../../../../../common/assets/images/checkbox.svg';
import PropTypes from 'prop-types';

const FilterOption = ({ item, setParams }) => {
    const [isChecked, setIsChecked] = useState(false);

    const changeHandler = () => {
        switch (isChecked) {
        case false:
            setParams(prevState => {
                return [
                    ...prevState,
                    item.id
                ];
            });
            setIsChecked(true);
            break;
        case true:
            setParams(prevState => {
                let newItems = [...prevState];
                newItems.splice(prevState.indexOf(item.id), 1);
                return newItems;
            });
            setIsChecked(false);
            break;
        }
    };

    return (
        <div className={s.optionsItem}>
            <label>
                <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={changeHandler}
                />
                {isChecked ? <Checkbox id={s.filled}/> : <span className={s.empty}/>}
                <p>{item.name}</p>
            </label>
        </div>
    );
};

FilterOption.propTypes = {
    item: PropTypes.object.isRequired,
    setParams: PropTypes.func.isRequired
};

export default FilterOption;