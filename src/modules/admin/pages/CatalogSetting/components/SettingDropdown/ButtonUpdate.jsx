import React from 'react';
import PropTypes from 'prop-types';
const ButtonUpdate = ({ s, handleUpdate }) => {
    return (
        <div className={s.button_wrapper_update}>
            <button className={s.button_update} onClick={handleUpdate}>
          Сохранить
            </button>
        </div>
    );
};

export default ButtonUpdate;

ButtonUpdate.propTypes = {
    handleUpdate: PropTypes.func,
    s: PropTypes.any,
};