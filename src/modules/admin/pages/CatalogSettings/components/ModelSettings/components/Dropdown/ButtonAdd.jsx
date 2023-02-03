import React from 'react';
import PropTypes from 'prop-types';
const ButtonAdd = ({  handleAdd }) => {
    return (
        <div>
            <button onClick={handleAdd}>
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
