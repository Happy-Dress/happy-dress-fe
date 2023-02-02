import React from 'react';
import ButtonDelete from '../Dropdown/ButtonDelete';
import ButtonAdd from '../Dropdown/ButtonAdd';
import DropdownScrollBar from '../Dropdown/DropdownScrollBar';
import PropTypes from 'prop-types';
import EditValueDropdown from '../Dropdown/EditValueDropdown';
import ButtonUpdate from '../Dropdown/ButtonUpdate';
import ButtonCancell from '../Dropdown/ButtonCancell';
import s from './DropdownMobile.module.scss';
const DropdownMobile = ({
    flatObj,
    modelExampl,
    deleteGroup,
    setModelExampl,
    handleCheck,
    deleteHandle,
    deleteOneHandle,
    handleChangeText,
    handleAdd,
    handleCancell,
    handleUpdate,
    editField,
    setEditField,
    currentValue,
    setCurrentValue
}) => {
    return (
        <>
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
                <div className={s.modal_mobile_scroll}>
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
                        <ButtonUpdate s={s} handleUpdate={handleUpdate} />
                        <ButtonCancell s={s} handleCancell={handleCancell} />
                    </div>
                )}
                <ButtonDelete
                    deleteGroup={deleteGroup}
                    deleteHandle={deleteHandle}
                    s={s}
                />
            </div>
        </>
    );
};

export default DropdownMobile;

DropdownMobile.propTypes = {
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
    handleCancell: PropTypes.func,
    handleUpdate: PropTypes.func,
    editField: PropTypes.bool,
    setEditField: PropTypes.func,
    setCurrentValue: PropTypes.func,
    currentValue: PropTypes.object,
};