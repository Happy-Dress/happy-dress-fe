import React, { useState } from 'react';
import s from './ButtonDefault.module.scss';
import PropTypes from 'prop-types';


const ButtonDefault = (props) => {
    const [ setActive] = useState(false);

    const changeState = () => {
        setActive(true);
        setTimeout(() => setActive(false), 200);
    };

    return (
        <button onClick={changeState}
            className={s.ButtonDefault}
        >
            {props.text}
        </button>
    );
};

ButtonDefault.propTypes = {
    text: PropTypes.string.isRequired,
};

export default ButtonDefault;
