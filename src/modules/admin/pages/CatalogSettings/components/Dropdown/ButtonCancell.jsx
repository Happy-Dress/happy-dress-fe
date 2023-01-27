import React from 'react';
import PropTypes from 'prop-types';

const ButtonCancell = ({ s, handleCancell }) => {
    return (
        <div className={s.button_wrapper_cancell}>
            <button className={s.button_cancell} onClick={handleCancell}>
          Отмена
            </button>
        </div>
    );
};

export default ButtonCancell;

ButtonCancell.propTypes = {
    handleCancell: PropTypes.func,
    s: PropTypes.any,
};