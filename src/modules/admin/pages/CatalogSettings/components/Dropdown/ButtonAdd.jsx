import React from 'react';
import PropTypes from 'prop-types';
const ButtonAdd = ({ s, handleAdd }) => {
    return (
        <div className={s.button_wrapper_add}>
            <button className={s.button_add} onClick={() => handleAdd()}>
        +Добавить
            </button>
        </div>
    );
};

export default ButtonAdd;

ButtonAdd.propTypes = {
    handleAdd: PropTypes.func,
    s: PropTypes.any
};