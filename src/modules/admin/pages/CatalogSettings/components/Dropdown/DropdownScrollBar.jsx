
import React from 'react';
import PropTypes from 'prop-types';
import { ReactComponent as Delete } from '../../../../../../assets/images/delete.svg';
import { ReactComponent as Pencil } from '../../../../../../assets/images/pencil.svg';
import { Reorder } from 'framer-motion';

const ModelItem = ({
    model,
    handleCheck,
    deleteOneHandle,
    setEditField,
    setCurrentValue,
    s,
}) => {
    return (
        <Reorder.Item
            draggable={true}
            value={model}
            whileDrag={{ scale: 1.1 }}
        >
            <div className={s.input_container} key={Math.random() * 10000}>
                <input
                    className={s.check}
                    type="checkbox"
                    checked={model.checked}
                    onChange={(e) => {
                        handleCheck(model.id, 'checked', e.target.checked);
                    }}
                />
                <input className={s.text} type="text" defaultValue={model.value} />
                <Pencil
                    className={s.pencil_img}
                    onClick={() => {
                        setEditField(true);
                        setCurrentValue({
                            id: model.id,
                            value: model.value,
                            checked: model.checked,
                        });
                    }}
                />
                <Delete
                    className={s.delete_img}
                    onClick={() => deleteOneHandle(model.id)}
                />
            </div>
        </Reorder.Item>
    );
};

const DropdownScrollBar = ({
    modelExampl,
    handleCheck,
    handleChangeText,
    deleteOneHandle,
    setModelExampl,
    editField,
    setEditField,
    currentValue,
    setCurrentValue,
    s,
}) => {
    return (
        <>
            <Reorder.Group
                as="div"
                axys="y"
                values={modelExampl}
                onReorder={setModelExampl}
                style={{ width: '94%' }}
            >
                {modelExampl.map((model) => (
                    <ModelItem
                        key={Math.random() * 10000}
                        model={model}
                        handleCheck={handleCheck}
                        handleChangeText={handleChangeText}
                        deleteOneHandle={deleteOneHandle}
                        editField={editField}
                        setEditField={setEditField}
                        currentValue={currentValue}
                        setCurrentValue={setCurrentValue}
                        s={s}
                    />
                ))}
            </Reorder.Group>
        </>
    );
};

export default DropdownScrollBar;

ModelItem.propTypes = {
    deleteHandle: PropTypes.func,
    deleteOneHandle: PropTypes.func,
    handleChangeText: PropTypes.func,
    handleCheck: PropTypes.func,
    model: PropTypes.object,
    s: PropTypes.any,
    editField: PropTypes.bool,
    setEditField: PropTypes.func,
    setCurrentValue: PropTypes.func,
    currentValue: PropTypes.object,
};

DropdownScrollBar.propTypes = {
    deleteHandle: PropTypes.func,
    deleteOneHandle: PropTypes.func,
    handleChangeText: PropTypes.func,
    handleCheck: PropTypes.func,
    modelExampl: PropTypes.array,
    setModelExampl: PropTypes.func,
    s: PropTypes.any,
    editField: PropTypes.bool,
    setEditField: PropTypes.func,
    setCurrentValue: PropTypes.func,
    currentValue: PropTypes.object,
};
