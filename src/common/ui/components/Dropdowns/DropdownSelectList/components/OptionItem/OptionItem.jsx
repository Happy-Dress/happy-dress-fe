import React, { useEffect, useState } from 'react';
import s from './OptionItem.module.scss';
import { ReactComponent as Checkbox } from '../../../../../../assets/images/checkbox.svg';
import PropTypes from 'prop-types';

const OptionItem = (props) => {

    const {
        isChecked: check,
        changeFilter,
        item,
        currentCategory,
        isSingleOptionOnly
    } = props;

    const [isChecked, setIsChecked] = useState(check);

    useEffect(() => {
        setIsChecked(check);
    }, [check]);

    const changeHandler = () => {
        let { add, remove, replace } = changeFilter();
        if(isSingleOptionOnly) {
            replace(item.id);
            return;
        }
        if(isChecked) {
            remove(item.id, currentCategory);
            setIsChecked(false);
        } else {
            add(item.id, currentCategory);
            setIsChecked(true);
        }
    };

    return (
        <div className={s.OptionItem}>
            <label>
                <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={changeHandler}
                    placeholder={'checkbox'}
                />
                {isChecked ? <Checkbox className={s.checkbox}/> : <span className={s.empty}/>}
                <p>{item.name}</p>
            </label>
        </div>
    );
};

OptionItem.propTypes = {
    isChecked: PropTypes.bool.isRequired,
    changeFilter: PropTypes.func.isRequired,
    item: PropTypes.object.isRequired,
    currentCategory: PropTypes.string.isRequired,
    isSingleOptionOnly: PropTypes.bool.isRequired
};

export default OptionItem;
