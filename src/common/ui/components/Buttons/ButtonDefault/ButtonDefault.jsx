import React, { useState } from 'react';
import s from './ButtonDefault.module.scss';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const ButtonDefault = ({ text, onClick, type }) => {
    const [active, setActive] = useState(false);

    const changeState = () => {
        if (onClick) {
            onClick();
        }
        setActive(true);
        setTimeout(() => setActive(false), 200);
    };

    return (
        <button onClick={changeState} type={type ? type : 'submit'}
            className={classNames(s.ButtonDefault, active ? s.ButtonDefault_active : '')}
        >
            {text}
        </button>
    );
};

ButtonDefault.propTypes = {
    text: PropTypes.string.isRequired,
    onClick: PropTypes.func,
    type: PropTypes.oneOf(['button', 'submit', 'reset']),
};

export default ButtonDefault;
