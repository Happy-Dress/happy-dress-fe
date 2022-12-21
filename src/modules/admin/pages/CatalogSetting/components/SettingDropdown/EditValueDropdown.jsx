import React from 'react';
import PropTypes from 'prop-types';

const EditValueDropdown = ({ s, currentValue, setCurrentValue }) => {
    return (
        <div className={s.edit_field}>
            <input
                className={s.input_field}
                type="text"
                value={currentValue.value}
                onChange={(e) => {setCurrentValue({ ...currentValue, value: e.target.value });}}
            />
        </div>
    );
};

export default EditValueDropdown;

EditValueDropdown.propTypes = {
    s: PropTypes.any,
    value: PropTypes.string,
    handleChangeText: PropTypes.func,
    currentValue: PropTypes.object,
    setCurrentValue: PropTypes.func,
    modelExampl: PropTypes.array,
    setModelExampl: PropTypes.func,
    flatObj: PropTypes.object,
    editFiield: PropTypes.bool,
    setEditField: PropTypes.func
};