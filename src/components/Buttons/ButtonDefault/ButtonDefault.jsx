import React, { useState } from 'react';
import s from './ButtonDefault.module.scss';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const ButtonDefault = (props) => {
    const [active, setActive] = useState(false);

    const changeState = () => {
        setActive(true);
        setTimeout(() => setActive(false), 200);
    };

    return (
        <button onClick={changeState}
            className={classNames(s.ButtonDefault, active ? s.ButtonDefault_active : '')}
        >
            {props.text}
        </button>
    );
};

ButtonDefault.propTypes = {
    text: PropTypes.string.isRequired,
};

export default ButtonDefault;
