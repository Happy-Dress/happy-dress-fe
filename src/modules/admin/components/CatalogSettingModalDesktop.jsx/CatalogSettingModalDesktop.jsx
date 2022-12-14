import React, { useState } from 'react';
import s from './CatalogSettingModalDesktop.module.scss';
import { nanoid } from 'nanoid';
import ButtonDelete from './ButtonDelete';
import ButtonAdd from './ButtonAdd';
import ModalScrollBar from './ModalScrollBar';

const CatalogSettingModalDesktop = () => {
    const flatObj = { id: nanoid(), value: '', checked: false };
    const [modelExampl, setModelExampl] = useState([]);
    const [counter, setCounter] = useState(0);

    function handleCheck(id, prop, value) {
        setModelExampl(
            modelExampl.map((obj) => {
                if (obj.id == id) {
                    return { ...obj, [prop]: value };
                } else {
                    return obj;
                }
            })
        );
        let count = 0;
        modelExampl.forEach((item) => {
            if (item.checked) count++;
        });
        setCounter(count);

        console.log(counter);
        console.log(modelExampl);
    }

    function handleAdd() {
        setModelExampl([...modelExampl, flatObj]);
    }
    function handleChangeText(id, e, prop) {
        setModelExampl(
            modelExampl.map((obj) => {
                if (obj.id == id) {
                    return { ...obj, [prop]: e.target.value };
                } else {
                    return obj;
                }
            })
        );
    }

    function deleteHandle() {
        setModelExampl(modelExampl.filter((item) => item.checked === false));
        setCounter(0);
    }

    function deleteOneHandle(id) {
        setModelExampl(
            modelExampl.filter(function (item) {
                if (item.checked) {
                    setCounter((prevCounter) => prevCounter - 1);
                    return item.id !== id;
                } else if (!item.checked) return item;
            })
        );
    }

    return (
        <div className={s.container}>
            <ButtonAdd handleAdd={handleAdd} />
            <div className={s.modal_desktop_scroll}>
                <ModalScrollBar
                    modelExampl={modelExampl}
                    deleteOneHandle={deleteOneHandle}
                    handleChangeText={handleChangeText}
                    handleCheck={handleCheck}
                    setModelExampl={setModelExampl}
                />
            </div>

            {counter > 1 && <ButtonDelete deleteHandle={deleteHandle} />}
        </div>
    );
};

export default CatalogSettingModalDesktop;
