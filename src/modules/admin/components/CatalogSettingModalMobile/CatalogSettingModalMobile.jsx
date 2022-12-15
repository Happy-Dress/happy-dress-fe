import React from 'react';
import ButtonDelete from '../CatalogSettingModal/ButtonDelete';
import ButtonAdd from '../CatalogSettingModal/ButtonAdd';
import ModalScrollBar from '../CatalogSettingModal/ModalScrollBar';
import PropTypes from 'prop-types';
import s from '../CatalogSettingModalMobile/CatalogSettingModalMobile.module.scss';
const CatalogSettingModalMobile = ({
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
        <>
            <div className={s.container}>
                <ButtonAdd handleAdd={handleAdd} s={s}/>
                <div className={s.modal_mobile_scroll}>
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
        </>
    );
};

export default CatalogSettingModalMobile;

CatalogSettingModalMobile.propTypes = {
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