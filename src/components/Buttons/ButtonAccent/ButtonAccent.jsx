import React, { useState } from 'react';
import s from './ButtonAccent.module.scss';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const ButtonAccent = ({ text, disabled, onClick }) => {
    const [active, setActive] = useState(false);

    const changeState = () => {
        onClick();
        setActive(true);
        setTimeout(() => setActive(false), 200);
    };

    return (
        <button
            onClick={changeState}
            className={classNames(s.ButtonAccent, active ? s.ButtonAccent_active : '')}
            disabled={disabled}
        >
            {text}
        </button>
    );
};

ButtonAccent.propTypes = {
    text: PropTypes.string.isRequired,
    onClick: PropTypes.func,
    disabled: PropTypes.bool,
};

export default ButtonAccent;
