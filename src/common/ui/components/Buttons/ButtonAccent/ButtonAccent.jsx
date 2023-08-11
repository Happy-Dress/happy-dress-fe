import React, { useState } from 'react';
import s from './ButtonAccent.module.scss';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const ButtonAccent = (props) => {
    const [active, setActive] = useState(false);

    const changeState = () => {
        setActive(true);
        setTimeout(() => setActive( false), 200);
        if(props.onClick) {
            props.onClick();
        }
    };

    return (
        <button onClick={changeState} type={props.type ? props.type : 'submit'}
            className={classNames(s.ButtonAccent, active ? s.ButtonAccent_active : '')}
            disabled={props.disabled}
        >
            {props.text}
        </button>
    );
};

ButtonAccent.propTypes = {
    text: PropTypes.string.isRequired,
    disabled: PropTypes.bool,
    onClick: PropTypes.func,
    type: PropTypes.oneOf(['button', 'submit', 'reset']),
};

export default ButtonAccent;
