import React, { useState } from 'react';
import s from './ButtonAccent.module.scss';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const ButtonAccent = (props) => {
    const [active, setActive] = useState(false);

    const changeState = () => {
        setActive(true);
        setTimeout(() => setActive( false), 200);
    };

    return (
        <button onClick={changeState}
            className={classNames(s.ButtonAccent, active ? s.ButtonAccent_active : '')}
        >
            {props.text}
        </button>
    );
};

ButtonAccent.propTypes = {
    text: PropTypes.string.isRequired,
};

export default ButtonAccent;
