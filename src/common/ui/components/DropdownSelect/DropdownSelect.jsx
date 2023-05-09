import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import cls from 'classnames';
import s from './DropdownSelect.module.scss';
import { ReactComponent as ArrowDown } from '../../../assets/images/arrowDown.svg';
import useOutsideClick from '../../hooks/useOutsideClick';
import { DROPDOWN_DICTIONARY } from './DropdownSelect.dictionary';

const { SELECTED } = DROPDOWN_DICTIONARY;

export const getName = (selectedItems, items, defaultValue) => {
    if (!selectedItems.length) {
        return defaultValue;
    }

    if (selectedItems.length === 1) {
        return items.filter((item) => selectedItems.toString() === item.id.toString())[0].name;
    }

    return `${selectedItems.length} ${SELECTED}`;
};

export const DropdownSelect = React.forwardRef(({
    name,
    placeholder,
    options,
    defaultValues,
    multiple,
    onChange,
    onBlur,
    error,
}, ref) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedOptions, setSelectedOptions] = useState(defaultValues
        ? defaultValues.map((item) => item.toString())
        : []);

    const outsideClickRef = useOutsideClick(() => setIsOpen(false));

    const inputType = multiple ? 'checkbox' : 'radio' ;

    useEffect(() => {
        if (Array.isArray(defaultValues)) {
            const values = new Set([...selectedOptions, ...defaultValues.map((value) => value.toString())]);
            setSelectedOptions([...values]);
        }
    }, [defaultValues]);

    const handleOptionClick = (e) => {
        onChange(e);

        if (!multiple) {
            setIsOpen(false);
            setSelectedOptions([e.target.value]);
            return;
        }

        if (e.target.checked) {
            setSelectedOptions([...selectedOptions, e.target.value]);
        } else {
            setSelectedOptions(selectedOptions.filter((item) =>(item.toString() !== e.target.value.toString())));
        }
    };

    const handleSelectClick = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className={s.csSelect} ref={outsideClickRef}>
            <div
                className={cls(s.csPlaceholder, error && s.csError)}
                onClick={handleSelectClick}
                data-testid={'selectPlaceholder'}
            >
                <span>{getName(selectedOptions, options, placeholder)}</span>
                <ArrowDown
                    className={isOpen ? s.active : ''}
                    data-testid={'arrowDown'}
                />
            </div>
            <div className={s.csOptions}
                style={{ height: isOpen ? `calc(60px * ${options.length})` : '0' }}>
                {options.map((item) => (
                    <div className={s.csOption} key={item.id + item.name}>
                        <label htmlFor={item.id + name}>
                            <input
                                id={item.id + name}
                                name={name}
                                value={item.id}
                                type={inputType}
                                ref={ref}
                                onChange={handleOptionClick}
                                onBlur={onBlur}
                                checked={selectedOptions.includes(item.id.toString())}
                            />
                            <span className={s.csOptionMark} />
                            <p>
                                {item.name}
                            </p>
                        </label>
                    </div>
                ))}
            </div>
        </div>
    );
});

const option = PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
});

DropdownSelect.propTypes = {
    name: PropTypes.string.isRequired,
    options: PropTypes.arrayOf(option).isRequired,
    onChange: PropTypes.func,
    onBlur: PropTypes.func,
    defaultValues: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.number), PropTypes.arrayOf(PropTypes.string)]),
    placeholder: PropTypes.string,
    multiple: PropTypes.bool,
    error: PropTypes.bool,
};
