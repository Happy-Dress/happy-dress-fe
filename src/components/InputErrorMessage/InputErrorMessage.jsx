import React from 'react';
import s from './InputErrorMessage.module.scss';

import PropTypes from 'prop-types';

export const InputErrorMessage = ({ text }) => {
    return (
        <p className={s.errorMessage}>
            {text}
        </p>
    );
};

InputErrorMessage.propTypes = {
    text: PropTypes.string.isRequired,
};
