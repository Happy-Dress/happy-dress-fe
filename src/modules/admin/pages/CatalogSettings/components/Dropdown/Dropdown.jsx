import React, { useState, useEffect } from 'react';
import { useDeviceTypeContext } from '../../../../../../common/ui/contexts/DeviceType';
import DropdownMobile from '../DropdownMobile/DropdownMobile';
import DropdownDesktop from '../DropdownDesktop/DropdownDesktop';
import PropTypes from 'prop-types';
const Dropdown = ({ modelsList, sendModels }) => {
    const { isDesktop, isMobile } = useDeviceTypeContext();
    const flatObj = {
        id: Math.floor(Math.random() * 100),
        name: '',
        checked: false,
    };
    const [modelExampl, setModelExampl] = useState([]);
    const [deleteGroup, setDeleteGroup] = useState(false);
    const [editField, setEditField] = useState(false);
    const [currentValue, setCurrentValue] = useState(flatObj);
    useEffect(() => {
        if (modelsList) {
            setModelExampl(modelsList);
        }
    }, [modelsList]);

    const checkModelExamplValue = () => {
        let count = 0;
        modelExampl.forEach((item) => {
            if (item.checked) count++;
        });
        if (count > 1) setDeleteGroup(true);
        else setDeleteGroup(false);
    };

    const handleCheck = (id, prop, name) => {
        setModelExampl(
            modelExampl.map((obj) => {
                if (obj.id == id) {
                    return { ...obj, [prop]: name };
                } else {
                    return obj;
                }
            })
        );
        checkModelExamplValue();
    };

    const handleAdd = () => {
        setModelExampl([...modelExampl, flatObj]);
    };
    const handleCancell = () => {
        setCurrentValue(flatObj);
        setEditField(false);
    };
    const handleUpdate = () => {
        setModelExampl(
            modelExampl.map((obj) => {
                if (obj.id == currentValue.id) {
                    return { ...obj, name: currentValue.name };
                } else {
                    return obj;
                }
            })
        );
        sendModels(modelExampl);
        setCurrentValue(flatObj);
        setEditField(false);
    };
    const handleChangeText = (id, e, prop) => {
        setModelExampl(
            modelExampl.map((obj) => {
                if (obj.id == id) {
                    return { ...obj, [prop]: e.target.value };
                } else {
                    return obj;
                }
            })
        );
    };

    const deleteHandle = () => {
        if (deleteGroup) {
            setModelExampl(modelExampl.filter((item) => item.checked === false));
            setDeleteGroup(false);
        }
    };

    const deleteOneHandle = (id) => {
        setModelExampl(
            modelExampl.filter(function (item) {
                if (item.checked) {
                    return item.id !== id;
                } else if (!item.checked) return item;
            })
        );
        checkModelExamplValue();
    };
    return (
        <div style={{ width: '98%' }}>
            {isMobile && (
                <DropdownMobile
                    flatObj={flatObj}
                    modelExampl={modelExampl}
                    deleteGroup={deleteGroup}
                    setDeleteGroup={setDeleteGroup}
                    setModelExampl={setModelExampl}
                    checkModelExamplValue={checkModelExamplValue}
                    handleCheck={handleCheck}
                    deleteHandle={deleteHandle}
                    deleteOneHandle={deleteOneHandle}
                    handleChangeText={handleChangeText}
                    handleAdd={handleAdd}
                    editField={editField}
                    setEditField={setEditField}
                    currentValue={currentValue}
                    setCurrentValue={setCurrentValue}
                    handleCancell={handleCancell}
                    handleUpdate={handleUpdate}
                />
            )}
            {isDesktop && (
                <DropdownDesktop
                    flatObj={flatObj}
                    modelExampl={modelExampl}
                    deleteGroup={deleteGroup}
                    setDeleteGroup={setDeleteGroup}
                    setModelExampl={setModelExampl}
                    checkModelExamplValue={checkModelExamplValue}
                    handleCheck={handleCheck}
                    deleteHandle={deleteHandle}
                    deleteOneHandle={deleteOneHandle}
                    handleChangeText={handleChangeText}
                    handleAdd={handleAdd}
                    editField={editField}
                    setEditField={setEditField}
                    currentValue={currentValue}
                    setCurrentValue={setCurrentValue}
                    handleCancell={handleCancell}
                    handleUpdate={handleUpdate}
                />
            )}
        </div>
    );
};

export default Dropdown;
Dropdown.propTypes = {
    modelsList: PropTypes.array,
    sendModels: PropTypes.func
};