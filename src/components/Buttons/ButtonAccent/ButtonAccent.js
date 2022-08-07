import React, { useState } from 'react';
import s from './ButtonAccent.module.scss';
import PropTypes from 'prop-types';

function ButtonAccent(props) {
    const [active, setActive] = useState(false);

    const changeState = () => {
        setActive(() => true);
        setTimeout(() => setActive(() => false), 200);
    };

    return (
        <button data-testid='ButtonAccent' onClick={changeState} className={active ? s.ButtonAccent_active : s.ButtonAccent}>{props.text}</button>
    );
}

ButtonAccent.propTypes = {
    text: PropTypes.string.isRequired
};

export default ButtonAccent;
