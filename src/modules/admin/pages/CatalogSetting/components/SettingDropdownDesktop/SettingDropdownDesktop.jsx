import React from 'react';
import s from './SettingDropdownDesktop.module.scss';
import ButtonDelete from '../SettingDropdown/ButtonDelete';
import ButtonAdd from '../SettingDropdown/ButtonAdd';
import ButtonUpdate from '../SettingDropdown/ButtonUpdate';
import ButtonCancell from '../SettingDropdown/ButtonCancell';
import EditValueDropdown from '../SettingDropdown/EditValueDropdown';
import DropdownScrollBar from '../SettingDropdown/DropdownScrollBar';
import PropTypes from 'prop-types';

const SettingDropdownDesktop = ({
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
    editField,
    setEditField,
    currentValue,
    setCurrentValue,
    handleCancell,
    handleUpdate
}) => {
    return (
        <div className={s.container}>
            {!editField ? (
                <ButtonAdd handleAdd={handleAdd} s={s} />
            ) : (
                <EditValueDropdown
                    s={s}
                    editField={editField}
                    setEditField={setEditField}
                    flatObj={flatObj}
                    modelExampl={modelExampl}
                    setModelExampl={setModelExampl}
                    currentValue={currentValue}
                    setCurrentValue={setCurrentValue}
                    handleChangeText={handleChangeText}
                />
            )}
            <div className={s.modal_desktop_scroll}>
                <DropdownScrollBar
                    modelExampl={modelExampl}
                    deleteOneHandle={deleteOneHandle}
                    handleChangeText={handleChangeText}
                    handleCheck={handleCheck}
                    setModelExampl={setModelExampl}
                    editField={editField}
                    setEditField={setEditField}
                    setCurrentValue={setCurrentValue}
                    currentValue={currentValue}
                    s={s}
                />
            </div>
            {editField && (
                <div className={s.update_and_cancell}>
                    <ButtonCancell s={s} handleCancell={handleCancell} />
                    <ButtonUpdate s={s} handleUpdate={handleUpdate} />
                </div>
            )}
            {deleteGroup && <ButtonDelete deleteHandle={deleteHandle} s={s} />}
        </div>
    );
};

export default SettingDropdownDesktop;
SettingDropdownDesktop.propTypes = {
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
    editField: PropTypes.bool,
    setEditField: PropTypes.func,
    setCurrentValue: PropTypes.func,
    currentValue: PropTypes.object,
    handleCancell: PropTypes.func,
    handleUpdate: PropTypes.func,
};
