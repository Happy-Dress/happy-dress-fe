import React, { useState } from 'react';
import s from './ButtonDefault.module.scss';
import PropTypes from 'prop-types';

function ButtonDefault(props) {
    const [active, setActive] = useState(false);

    const changeState = () => {
        setActive(() => true);
        setTimeout(() => setActive(() => false), 200);
    };

    return (
        <button onClick={changeState} className={active ? s.ButtonDefault_active : s.ButtonDefault}>{props.text}</button>
    );
}

ButtonDefault.propTypes = {
    text: PropTypes.string.isRequired
};

export default ButtonDefault;
