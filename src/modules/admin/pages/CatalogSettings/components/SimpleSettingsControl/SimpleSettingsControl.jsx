import React, { useState } from 'react';
import SettingsList from '../SettingsList';
import s from './SimpleSettingsControl.module.scss';
import { ButtonAccent, ButtonDefault, ButtonTerritory } from '../../../../../../common/ui/components/Buttons';
import classNames from 'classnames';
import {  SIMPLE_SETTINGS_CONTROL_DICTIONARY } from './SimpleSettingsControl.dictionary';
import PropTypes from 'prop-types';
import { useModal } from 'react-modal-hook';

const MIN_MODEL_NAME_LENGTH = 3;
const STARTING_ORDER_NUMBER = 0;
const MAX_MODEL_NAME_LENGTH = 20;
const EMPTY_NAME = '';

const {
    ADD_BUTTON_LABEL,
    SAVE_BUTTON_LABEL,
    DELETE_BUTTON_LABEL,
    CANCEL_BUTTON_LABEL,
    DUPLICATE_LABEL,
} = SIMPLE_SETTINGS_CONTROL_DICTIONARY;

export const SimpleSettingsControl = ({ updateSettings, settingsList, ModalComponent }) => {

    const [editingModel, setEditingModel] = useState();
    const [editingModelModal, setEditingModelModal] = useState(null);
    const [selectedOrderNumbers, setSelectedOrderNumbers] = useState([]);
    const [isExists, setIsExists] = useState(false);

    const [showModal, hideModal] = useModal(() => {
        return <ModalComponent
            updateSettings={updateSettings}
            settingsList={settingsList}
            editingModel={editingModelModal}
            setEditingModel={setEditingModelModal}
            onClose={hideModal}
        />;
    }, [settingsList, editingModelModal]);

    const handleReorder = (reorderedModels) => {
        updateSettings(reorderedModels);
    };

    const handleEdit = (model) => {
        if(ModalComponent) {
            setEditingModelModal(model);
            showModal();
            return;
        }

        setEditingModel(model);
    };

    const handleSave = () => {
        const modelOrderNumber = editingModel.orderNumber;
        if (modelOrderNumber !== undefined) {
            const updatedModels = settingsList.map((model) =>{
                if(model.orderNumber === modelOrderNumber) {
                    return { ...model, name: editingModel.name };
                }
                return model;
            });
            updateSettings(updatedModels);
        } else {
            const modelsOrderNumbers = settingsList.map(model => model.orderNumber);
            const newOrderNumber = modelsOrderNumbers.length ? Math.max(...modelsOrderNumbers) + 1 : STARTING_ORDER_NUMBER;
            updateSettings([...settingsList, { name: editingModel.name, orderNumber:newOrderNumber }]);
        }

        setEditingModel(null);
    };

    const handleCancel = () => {
        setEditingModel(null);
    };

    const handleAdd = () =>{
        if(ModalComponent) {
            showModal();
            return;
        }

        setEditingModel({ name: EMPTY_NAME });
    };

    const handleSelect = (model) => {
        setSelectedOrderNumbers([...selectedOrderNumbers, model.orderNumber]);
    };

    const handleUnselect = (model) => {
        setSelectedOrderNumbers(selectedOrderNumbers.filter(orderNumber => orderNumber!== model.orderNumber));
    };

    const handleRemove = (modelToRemove) =>{
        const modelsToUpdate = settingsList.filter(model => model.orderNumber !== modelToRemove.orderNumber);
        setSelectedOrderNumbers(selectedOrderNumbers.filter(orderNumber => orderNumber !== modelToRemove.orderNumber));
        updateSettings(modelsToUpdate);
    };

    const handleDelete = () => {
        const modelsToUpdate = settingsList.filter(model => !selectedOrderNumbers.includes(model.orderNumber));
        updateSettings(modelsToUpdate);
        setSelectedOrderNumbers([]);
    };

    const handleListClick = (event) =>{
        if(editingModel) {
            event.stopPropagation();
        }
    };

    const handleInputChange = (event) => {
        setIsExists(settingsList.some(setting => setting.name.toLowerCase() === event.target.value.trim().toLowerCase()));
        setEditingModel({ ...editingModel, name: event.target.value.trim() });
    };

    return (
        <div className={s.ModelSettings}>
            <input
                maxLength={MAX_MODEL_NAME_LENGTH}
                onChange={handleInputChange}
                value={editingModel?.name || EMPTY_NAME}
                className={classNames(
                    s.settingInput,
                    isExists ? s.settingInputDirty : '',
                    editingModel? s.inputControlVisible : s.inputControlHidden
                )}
            />
            <p hidden={!isExists} className={s.duplicateField}>{DUPLICATE_LABEL}</p>
            <button onClick={handleAdd}
                className={classNames(
                    s.addButton,
                    editingModel? s.inputControlHidden: s.inputControlVisible)}>
                {ADD_BUTTON_LABEL}
            </button>


            <div onClickCapture={handleListClick}>
                <SettingsList
                    onEdit={handleEdit}
                    onSelect={handleSelect}
                    onUnSelect={handleUnselect}
                    settings={settingsList}
                    handleReorder={handleReorder}
                    onRemove={handleRemove}
                />
            </div>

            {editingModel &&
                <div className={s.buttonArea}>
                    <ButtonDefault onClick={handleCancel} text={CANCEL_BUTTON_LABEL}/>
                    <ButtonAccent
                        disabled={isExists || editingModel.name?.length < MIN_MODEL_NAME_LENGTH}
                        onClick={handleSave}
                        text={SAVE_BUTTON_LABEL}/>
                </div>}
            {
                (!editingModel && !!selectedOrderNumbers.length) &&
                <div className={s.deleteButtonArea}>
                    <ButtonTerritory onClick={handleDelete} text={DELETE_BUTTON_LABEL}/>
                </div>
            }
        </div>
    );
};
SimpleSettingsControl.propTypes = {
    settingsList: PropTypes.array.isRequired,
    updateSettings: PropTypes.func.isRequired,
    ModalComponent: PropTypes.func
};



export default SimpleSettingsControl;
