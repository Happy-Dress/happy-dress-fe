import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
// import { ReactComponent as ArrowDown } from '../../../../common/assets/images/arrowDown.svg';
import { ReactComponent as ArrowDown } from '../../../../common/assets/images/arrowDown.svg';
import { ReactComponent as Checkbox } from '../../../../common/assets/images/checkbox.svg';

import s from './DropdownSelect.module.scss';

// export const DropdownSelect = ({ name, options, defaultValue, register, placeholder, multiple, ...props }) => {
export const DropdownSelectControlled = ({ name, placeholder, options, defaultValue, multiple, onChange, onBlur, id, register, value } ) => {

    const [isOpen, setIsOpen] = useState(false);
    const [value1, setValue1] = useState(value);
    const selectRef = useRef(value1);

    useEffect(() => {
        // console.log('selectRef', selectRef);
        // console.log('selectRef.current', selectRef.current);
        // console.log('ref.current', ref().value);
        // ref.focus();
        // selectRef.current.selectedIndex.value;
    }, [value1]);

    const handleSelectClick = () => {
        setIsOpen(!isOpen);
    };
    const handleOptionClick = (e, value) => {
        setValue1(value);
        // onChange(e);
        // selectRef.current.value = value;
        selectRef.current.selectedOptions[0].value = value;
        console.log(e.target);
        console.log('selectRef', selectRef.current.selectedOptions[0].value);
        console.log('selectRef selectedOptions', selectRef.current.selectedOptions);
        // onChange(selectRef.current.selectedOptions[0].value);
        onChange(value);
    };

    return (
        <div className={s.csSelect}>
            <div className={s.csPlaceholder} onClick={handleSelectClick}>
                <span>{placeholder}</span>
                <ArrowDown className={isOpen ? s.active : ''}/>
            </div>
            <div className={s.csOptions} style={{ height: isOpen ? `calc(60px * ${options.length})` : '0' }}>
                <ul>
                    {options.map((item) => (
                        <li
                            key={item.id}
                            className={value1 === item.id ? s.csSelected : null}
                            onClick={(e) => handleOptionClick(e, item.id)}
                        >
                            <span>{item.name}</span>
                        </li>
                    ))}
                    <li
                        data-option data-value="11"
                        className={value1 === '11' ? s.csSelected : null}
                        // className={s.csSelected}
                        onClick={(e) => handleOptionClick(e, '11')}
                    >
                        <span>Вариант 1 Вариант 1</span></li>
                    <li
                        data-option
                        className={value1 === '22' ? s.csSelected : null}
                        data-value="22"
                        // onClick={() => {
                        //     setValue1('22');
                        // }}
                        onClick={(e) => handleOptionClick(e, '22')}

                    >
                        <span>Вариант 2</span>
                    </li>
                    <li
                        data-option
                        className={value1 === '33' ? s.csSelected : null}
                        data-value="33"
                        // onClick={() => setValue1('33')}
                        onClick={(e) => handleOptionClick(e, '33')}
                    ><span>Вариант 3</span></li>
                </ul>
            </div>
            <select
                name={name}
                ref={selectRef}
                onBlur={onBlur}
                onChange={(e) => {
                    setValue1(e.target.value);
                    onChange(e);
                }}
                value={value1}
            >
                <option value="11">Вариант 1 Вариант 1</option>
                <option value="22">Вариант 2</option>
                <option value="33">Вариант 3</option>
            </select>
        </div>
    );
};

const option = PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
});

DropdownSelectControlled.propTypes = {
    name: PropTypes.string.isRequired,
    options: PropTypes.arrayOf(option).isRequired,
    onChange: PropTypes.func,
    onBlur: PropTypes.func,
    register: PropTypes.func,
    defaultValue: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    placeholder: PropTypes.string,
    id: PropTypes.number,
    multiple: PropTypes.bool,
    value: PropTypes.any,
};
