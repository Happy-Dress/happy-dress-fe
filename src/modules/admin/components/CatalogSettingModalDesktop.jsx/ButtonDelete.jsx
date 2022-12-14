import React from 'react';
import s from './CatalogSettingModalDesktop.module.scss';
import PropTypes from 'prop-types';
const ButtonDelete = ({ deleteHandle }) => {
    return (
        <div className={s.button_wrapper_delete}>
            <button className={s.button_delete} onClick={deleteHandle}>
        Удалить
            </button>
        </div>
    );
};

export default ButtonDelete;

ButtonDelete.propTypes={
    deleteHandle: PropTypes.func,
};