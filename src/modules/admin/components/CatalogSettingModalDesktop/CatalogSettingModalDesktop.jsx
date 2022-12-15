import React from 'react';
import s from './CatalogSettingModalDesktop.module.scss';
import ButtonDelete from '../CatalogSettingModal/ButtonDelete';
import ButtonAdd from '../CatalogSettingModal/ButtonAdd';
import ModalScrollBar from '../CatalogSettingModal/ModalScrollBar';
import PropTypes from 'prop-types';
const CatalogSettingModalDesktop = ({
    flatObj,
    modelExampl,
    deleteGroup,
    setDeleteGroup,
    setModelExampl,
    checkModelExamplValue,
    handleCheck,
    deleteHandle,
    deleteOneHandle,
    handleChangeText,
    handleAdd,
}) => {
    return (
        <div className={s.container}>
            <ButtonAdd handleAdd={handleAdd} s={s}/>
            <div className={s.modal_desktop_scroll}>
                <ModalScrollBar
                    modelExampl={modelExampl}
                    deleteOneHandle={deleteOneHandle}
                    handleChangeText={handleChangeText}
                    handleCheck={handleCheck}
                    setModelExampl={setModelExampl}
                    s={s}
                />
            </div>

            {deleteGroup && <ButtonDelete deleteHandle={deleteHandle} s={s}/>}
        </div>
    );
};

export default CatalogSettingModalDesktop;
CatalogSettingModalDesktop.propTypes = {
    setDeleteGroup: PropTypes.func,
    setModelExampl: PropTypes.func,
    modelExampl: PropTypes.array,
    flatObj: PropTypes.object,
    deleteGroup: PropTypes.bool,
    checkModelExamplValue: PropTypes.func,
    handleCheck: PropTypes.func,
    deleteHandle: PropTypes.func,
    deleteOneHandle: PropTypes.func,
    handleChangeText: PropTypes.func,
    handleAdd: PropTypes.func,
};
