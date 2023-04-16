import * as React from 'react';
import PropTypes from 'prop-types';
import s from './TextField.module.scss';

export const TextField = ({ id, name, placeholder, onChange, register }) => {
    return (
        <input
            className={s.textField}
            id={id}
            type='text'
            name={name}
            placeholder={placeholder}
            onChange={onChange}
            {...register && { ...register(id) }}
        />
    );
};

TextField.propTypes = {
    id: PropTypes.string,
    name: PropTypes.string,
    placeholder: PropTypes.string,
    onChange: PropTypes.func,
    register: PropTypes.func,
};
