import React from 'react';
import s from './CatalogSettingModalDesktop.module.scss';
import PropTypes from 'prop-types';
const ButtonAdd = ({ handleAdd }) => {
    return (
        <div className={s.button_wrapper_add}>
            <button className={s.button_add} onClick={(e) => handleAdd()}>
        +Добавить
            </button>
        </div>
    );
};

export default ButtonAdd;

ButtonAdd.propTypes = {
    handleAdd: PropTypes.func,
};