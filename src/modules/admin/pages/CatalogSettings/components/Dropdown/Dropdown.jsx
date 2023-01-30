import React, { useState, useEffect } from 'react';
import { useDeviceTypeContext } from '../../../../../../common/ui/contexts/DeviceType';
import DropdownMobile from '../DropdownMobile/DropdownMobile';
import DropdownDesktop from '../DropdownDesktop/DropdownDesktop';
import PropTypes from 'prop-types';
const Dropdown = ({ models }) => {
    const { isDesktop, isMobile } = useDeviceTypeContext();
    const flatObj = { id: Math.random()*10000, value: '', checked: false };
    const [modelExampl, setModelExampl] = useState([]);
    const [deleteGroup, setDeleteGroup] = useState(false);
    const [editField, setEditField] = useState(false);
    const [currentValue, setCurrentValue] = useState(flatObj);
    useEffect(()=>{
        if(models){
            const convertedModels = models.map(model=>({ id: model.id, value: model.name }));
            setModelExampl(convertedModels);
        }
    },[models]);
    const checkModelExamplValue = () => {
        let count = 0;
        modelExampl.forEach((item) => {
            if (item.checked) count++;
        });
        if (count > 1) setDeleteGroup(true);
        else setDeleteGroup(false);
    };

    const handleCheck = (id, prop, value) => {
        setModelExampl(
            modelExampl.map((obj) => {
                if (obj.id == id) {
                    return { ...obj, [prop]: value };
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
                    return { ...obj, value: currentValue.value };
                } else {
                    return obj;
                }
            })
           
        );
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
        if(deleteGroup){
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
    models: PropTypes.array
};