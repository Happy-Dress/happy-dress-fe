import React from 'react';
import s from './CatalogSettingModalDesktop.module.scss';
import PropTypes from 'prop-types';
import { ReactComponent as Delete } from '../../../../assets/images/delete.svg';
import { ReactComponent as Pencil } from '../../../../assets/images/pencil.svg';
import { nanoid } from 'nanoid';
import { Reorder } from 'framer-motion';

const ModelItem = ({
    model,
    handleCheck,
    handleChangeText,
    deleteOneHandle,
}) => {
    return (
        <Reorder.Item  draggable={true} value={model} whileDrag={{ scale: 1.1 }}>
            <div className={s.input_container} key={nanoid()}>
                <input
                    className={s.check}
                    type="checkbox"
                    checked={model.checked}
                    onChange={(e) => {
                        handleCheck(model.id, 'checked', e.target.checked);
                    }}
                />
                <input
                    className={s.text}
                    type="text"
                    defaultValue={model.value}
                    onBlur={(e) => {
                        handleChangeText(model.id, e, 'value');
                    }}
                />
                <Pencil className={s.pencil_img} onClick={(e) => {}} />
                <Delete
                    className={s.delete_img}
                    onClick={() => deleteOneHandle(model.id)}
                />
            </div>
        </Reorder.Item>
    );
};


const ModalScrollBar = ({
    modelExampl,
    handleCheck,
    handleChangeText,
    deleteOneHandle,
    setModelExampl
}) => {
    return (
        <>
            <Reorder.Group
                as="div"
                axys="y"
                values={modelExampl}
                onReorder={setModelExampl}
            >
                {modelExampl.map((model, index) => (
                    <ModelItem
                        key={nanoid()}
                        model={model}
                        handleCheck={handleCheck}
                        handleChangeText={handleChangeText}
                        deleteOneHandle={deleteOneHandle}
                    />
                ))}
            </Reorder.Group>
        </>
    );
};

export default ModalScrollBar;

ModelItem.propTypes = {
    deleteHandle: PropTypes.func,
    deleteOneHandle: PropTypes.func,
    handleChangeText: PropTypes.func,
    handleCheck: PropTypes.func,
    model: PropTypes.object,
};

ModalScrollBar.propTypes = {
    deleteHandle: PropTypes.func,
    deleteOneHandle: PropTypes.func,
    handleChangeText: PropTypes.func,
    handleCheck: PropTypes.func,
    modelExampl: PropTypes.array,
    setModelExampl: PropTypes.func,
};

