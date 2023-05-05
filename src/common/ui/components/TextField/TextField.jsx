import * as React from 'react';
import PropTypes from 'prop-types';
import s from './TextField.module.scss';
import cls from 'classnames';

export const TextField = React.forwardRef(({
    onChange,
    name,
    placeholder,
    onBlur,
    error,
}, ref) => {

    return (
        <input
            name={name}
            className={cls(s.textField, error && s.error)}
            onChange={onChange}
            onBlur={onBlur}
            type='text'
            placeholder={placeholder}
            ref={ref}
        />
    );
});

TextField.propTypes = {
    id: PropTypes.string,
    name: PropTypes.string,
    placeholder: PropTypes.string,
    onChange: PropTypes.func,
    onBlur: PropTypes.func,
    error: PropTypes.bool,
};
