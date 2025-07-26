import React, { useEffect, useState } from 'react';
import PropTypes, { oneOf } from 'prop-types';
import cls from 'classnames';
import s from './DropdownSelect.module.scss';
import ArrowDown from '../../../assets/images/arrowDown.svg';
import useOutsideClick from '../../hooks/useOutsideClick';
import { DROPDOWN_DICTIONARY } from './DropdownSelect.dictionary';
import classNames from 'classnames';

const { SELECTED } = DROPDOWN_DICTIONARY;

export const getName = (selectedItems, items, defaultValue) => {
    if (!selectedItems.length) {
        return defaultValue;
    }

    if (selectedItems.length === 1) {
        const itemName = items.filter((item) => selectedItems.toString() === item.value.toString())[0]?.label;
        return itemName ? itemName : defaultValue;
    }

    return `${selectedItems.length} ${SELECTED}`;
};

export const DropdownSelect = React.forwardRef((
    {
        name,
        placeholder,
        placeholderComponent,
        options,
        defaultValues,
        multiple,
        onChange,
        onBlur,
        error,
        size,
        itemComponent,
    }, ref) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedOptions, setSelectedOptions] = useState([]);

    const outsideClickRef = useOutsideClick(() => setIsOpen(false));

    const inputType = multiple ? 'checkbox' : 'radio';

    useEffect(() => {
        if (Array.isArray(defaultValues)) {
            const values = new Set([...selectedOptions, ...defaultValues.map((value) => value.toString())]);
            setSelectedOptions([...values]);
        } else if (typeof defaultValues === 'string') {
            setSelectedOptions([defaultValues]);
        }
    }, [defaultValues]);

    const handleOptionClick = (e) => {
        onChange && onChange(e);

        if (!multiple) {
            setIsOpen(false);
            setSelectedOptions([e.target.value]);
            return;
        }

        if (e.target.checked) {
            setSelectedOptions([...selectedOptions, e.target.value]);
        } else {
            setSelectedOptions(selectedOptions.filter((item) => (item.toString() !== e.target.value.toString())));
        }
    };

    const handleSelectClick = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className={cls(
            s.csSelect,
            size === 'small' && s.csSelectSmall
        )} ref={outsideClickRef}>
            <div
                className={cls(s.csPlaceholder, size === 'small' && s.csPlaceholderSmall, error && s.csError)}
                onClick={handleSelectClick}
                data-testid={'selectPlaceholder'}
            >
                {placeholderComponent ?
                    placeholderComponent(placeholder) :
                    <span>{getName(selectedOptions, options, placeholder)}</span>
                }
                <ArrowDown
                    className={cls(
                        isOpen ? s.active : '',
                        s.csPlaceholderIcon,
                        size === 'small' && s.csPlaceholderIconSmall
                    )}
                    data-testid={'arrowDown'}
                />
            </div>
            <div className={s.csOptions}
                style={{ height: isOpen ? `calc(88px * ${options.length})` : '0' }}>
                {options.map((item) => (
                    <div className={classNames(s.csOption, size === 'small' && s.csOptionSmall)}
                        key={item.value + item.label}>
                        <label htmlFor={item.value + name}>
                            <input
                                id={item.value + name}
                                name={name}
                                value={item.value}
                                type={inputType}
                                ref={ref}
                                onChange={handleOptionClick}
                                onBlur={onBlur}
                                checked={selectedOptions.includes(item.value.toString())}
                            />
                            <span className={s.csOptionMark}/>
                            {itemComponent ?
                                (itemComponent(item)) :
                                <p>
                                    {item.label}
                                </p>
                            }
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
    value: PropTypes.oneOfType(
        [
            PropTypes.string,
            PropTypes.number,
        ]
    ),
    label: PropTypes.string,
});

DropdownSelect.propTypes = {
    name: PropTypes.string.isRequired,
    options: PropTypes.arrayOf(option).isRequired,
    onChange: PropTypes.func,
    onBlur: PropTypes.func,
    defaultValues: PropTypes.oneOfType(
        [
            PropTypes.arrayOf(PropTypes.number),
            PropTypes.arrayOf(PropTypes.string),
            PropTypes.string,
        ]),
    placeholder: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
    placeholderComponent: PropTypes.func,
    multiple: PropTypes.bool,
    error: PropTypes.bool,
    size: oneOf(['default', 'small']),
    itemComponent: PropTypes.func,
};
