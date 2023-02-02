import React from 'react';
import PropTypes from 'prop-types';

const ButtonDelete = ({ s, deleteHandle, deleteGroup }) => {
    return (
        <div className={s.button_wrapper_delete}>
            <button  className={deleteGroup ? s.button_delete : s.button_delete_disable} onClick={deleteHandle}>
          Удалить
            </button>
        </div>
    );
};

export default ButtonDelete;

ButtonDelete.propTypes={
    deleteHandle: PropTypes.func,
    s: PropTypes.any,
    deleteGroup: PropTypes.bool
};