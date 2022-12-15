import React, { useState } from 'react';
import { useDeviceTypeContext } from '../../../../common/contexts/DeviceType';
import CatalogSettingModalMobile from '../CatalogSettingModalMobile/CatalogSettingModalMobile';
import CatalogSettingModalDesktop from '../CatalogSettingModalDesktop/CatalogSettingModalDesktop';
import { nanoid } from 'nanoid';
const CatalogSettingModal = () => {
    const { isDesktop, isMobile } = useDeviceTypeContext();
    const flatObj = { id: nanoid(), value: '', checked: false };
    const [modelExampl, setModelExampl] = useState([]);
    const [deleteGroup, setDeleteGroup] = useState(false);
    
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
        setModelExampl(modelExampl.filter((item) => item.checked === false));
        setDeleteGroup(false);
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
        <div>
            {isMobile && (
                <CatalogSettingModalMobile
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
                />
            )}
            {isDesktop && (
                <CatalogSettingModalDesktop
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
                />
            )}
        </div>
    );
};

export default CatalogSettingModal;