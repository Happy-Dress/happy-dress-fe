import React, { useState } from 'react';
import SettingsList from '../SettingsList';
import s from './ModelSettings.module.scss';
import { ButtonAccent, ButtonDefault, ButtonTerritory } from '../../../../../../common/ui/components/Buttons';
import { useCatalogSettings } from '../../contexts/CatalogSettingsContext/hook/useCatalogSettings';
import classNames from 'classnames';
import { MODEL_SETTINGS_DICTIONARY } from './ModelSettings.dictionary';

const MIN_MODEL_NAME_LENGTH = 3;
const STARTING_ORDER_NUMBER = 0;
const MAX_MODEL_NAME_LENGTH = 20;
const EMPTY_NAME = '';

const {
    ADD_BUTTON_LABEL,
    SAVE_BUTTON_LABEL,
    DELETE_BUTTON_LABEL,
    CANCEL_BUTTON_LABEL
} = MODEL_SETTINGS_DICTIONARY;

export const ModelSettings = () => {

    const { settings: { models }, updateModels } = useCatalogSettings();
    const [editingModel, setEditingModel] = useState();
    const [selectedOrderNumbers, setSelectedOrderNumbers] = useState([]);

    const handleReorder = (reorderedModels) => {
        updateModels(reorderedModels);
    };

    const handleEdit = (model) => {
        setEditingModel(model);
    };

    const handleSave = () => {
        const modelOrderNumber = editingModel.orderNumber;
        if (modelOrderNumber !== undefined) {
            const updatedModels = models.map((model) =>{
                if(model.orderNumber === modelOrderNumber) {
                    return { ...model, name: editingModel.name };
                }
                return model;
            });
            updateModels(updatedModels);
        } else {
            const modelsOrderNumbers = models.map(model => model.orderNumber);
            const newOrderNumber = modelsOrderNumbers.length ? Math.max(...modelsOrderNumbers) + 1 : STARTING_ORDER_NUMBER;
            updateModels([...models, { name: editingModel.name, orderNumber:newOrderNumber }]);
        }

        setEditingModel(null);
    };

    const handleCancel = () => {
        setEditingModel(null);
    };

    const handleAdd = () =>{
        setEditingModel({ name: EMPTY_NAME });
    };

    const handleSelect = (model) => {
        setSelectedOrderNumbers([...selectedOrderNumbers, model.orderNumber]);
    };

    const handleUnselect = (model) => {
        setSelectedOrderNumbers(selectedOrderNumbers.filter(orderNumber => orderNumber!== model.orderNumber));
    };

    const handleRemove = (modelToRemove) =>{
        const modelsToUpdate = models.filter(model => model.orderNumber !== modelToRemove.orderNumber);
        setSelectedOrderNumbers(selectedOrderNumbers.filter(orderNumber => orderNumber !== modelToRemove.orderNumber));
        updateModels(modelsToUpdate);
    };

    const handleDelete = () => {
        const modelsToUpdate = models.filter(model => !selectedOrderNumbers.includes(model.orderNumber));
        updateModels(modelsToUpdate);
        setSelectedOrderNumbers([]);
    };

    const handleListClick = (event) =>{
        if(editingModel) {
            event.stopPropagation();
        }
    };

    const handleInputChange = (event) => {
        setEditingModel({ ...editingModel, name: event.target.value });
    };

    return (
        <div className={s.ModelSettings}>
            <input
                maxLength={MAX_MODEL_NAME_LENGTH}
                onChange={handleInputChange}
                value={editingModel?.name || EMPTY_NAME}
                className={classNames(s.settingInput, editingModel? s.inputControlVisible : s.inputControlHidden)}
            />
            <button onClick={handleAdd} className={classNames(s.addButton, editingModel? s.inputControlHidden: s.inputControlVisible)}>
                {ADD_BUTTON_LABEL}
            </button>


            <div onClickCapture={handleListClick}>
                <SettingsList
                    onEdit={handleEdit}
                    onSelect={handleSelect}
                    onUnSelect={handleUnselect}
                    settings={models}
                    handleReorder={handleReorder}
                    onRemove={handleRemove}
                />
            </div>

            {editingModel &&
                <div className={s.buttonArea}>
                    <ButtonDefault onClick={handleCancel} text={CANCEL_BUTTON_LABEL}/>
                    <ButtonAccent disabled={editingModel.name?.length < MIN_MODEL_NAME_LENGTH} onClick={handleSave} text={SAVE_BUTTON_LABEL}/>
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

export default ModelSettings;
