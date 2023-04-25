import * as React from 'react';
import PropTypes from 'prop-types';
import s from './TextField.module.scss';

export const TextField = React.forwardRef(({
    onChange,
    name,
    placeholder,
    onBlur,
}, ref) => {

    return (
        <input
            name={name}
            className={s.textField}
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
};
