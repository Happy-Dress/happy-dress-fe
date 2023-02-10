/* eslint-disable react/prop-types */
import React, { useState, useContext, createContext } from 'react';
import SettingsList from '../SettingsList';
import s from './MaterialSettings.module.scss';
import { ButtonAccent, ButtonDefault, ButtonTerritory } from '../../../../../../common/ui/components/Buttons';
import { useCatalogSettings } from '../../contexts/CatalogSettingsContext/hook/useCatalogSettings';
import classNames from 'classnames';
import { MATERIAL_SETTINGS_DICTIONARY } from './MaterialSettings.dictionary';
import { withSettings, useSettingsContext, SettingsContext } from './withSettings';
import withProvider from '../../../../../../common/ui/hocs/withProvider';
const MIN_MODEL_NAME_LENGTH = 3;
const STARTING_ORDER_NUMBER = 0;
const MAX_MODEL_NAME_LENGTH = 20;
const EMPTY_NAME = '';

const {
    ADD_BUTTON_LABEL,
    SAVE_BUTTON_LABEL,
    DELETE_BUTTON_LABEL,
    CANCEL_BUTTON_LABEL,
} = MATERIAL_SETTINGS_DICTIONARY;


export const MaterialSettings = () => {
    const {
        settings: { materials },
        updateMaterials,
    } = useCatalogSettings();
    
    const handleReorder = (reorderedMaterials) => {
        updateMaterials(reorderedMaterials);
    };
    const { handleEdit, editingValue, setEditingValue, selectedOrderNumbers, setSelectedOrderNumbers, handleAdd, handleCancel, handleSelect,handleUnselect } = useSettingsContext();

    const handleSave = () => {
        const materialOrderNumber = editingValue.orderNumber;
        if (materialOrderNumber !== undefined) {
            const updatedMaterials = materials.map((material) => {
                if (material.orderNumber === materialOrderNumber) {
                    return { ...material, name: editingValue.name };
                }
                return material;
            });
            updateMaterials(updatedMaterials);
        } else {
            const materialsOrderNumbers = materials.map(
                (material) => material.orderNumber
            );
            const newOrderNumber = materialsOrderNumbers.length
                ? Math.max(...materialsOrderNumbers) + 1
                : STARTING_ORDER_NUMBER;
            updateMaterials([
                ...materials,
                { name: editingValue.name, orderNumber: newOrderNumber },
            ]);
        }

        setEditingValue(null);
    };

   

    const handleRemove = (materialToRemove) =>{
        const materialsToUpdate = materials.filter(
            (material) => material.orderNumber !== materialToRemove.orderNumber
        );
        setSelectedOrderNumbers(
            selectedOrderNumbers.filter(
                (orderNumber) => orderNumber !== materialToRemove.orderNumber
            )
        );
        updateMaterials(materialsToUpdate);
    };

    const handleDelete = () => {
        const materialsToUpdate = materials.filter(
            (material) => !selectedOrderNumbers.includes(material.orderNumber)
        );
        updateMaterials(materialsToUpdate);
        setSelectedOrderNumbers([]);
    };

    const handleListClick = (event) =>{
        if (editingValue) {
            event.stopPropagation();
        }
    };

    const handleInputChange = (event) => {
        setEditingValue({ ...editingValue, name: event.target.value });
    };

    return (
        <div className={s.ModelSettings}>
            <input
                maxLength={MAX_MODEL_NAME_LENGTH}
                onChange={handleInputChange}
                value={editingValue?.name || EMPTY_NAME}
                className={classNames(
                    s.settingInput,
                    editingValue ? s.inputControlVisible : s.inputControlHidden
                )}
            />
            <button
                onClick={handleAdd}
                className={classNames(
                    s.addButton,
                    editingValue ? s.inputControlHidden : s.inputControlVisible
                )}
            >
                {ADD_BUTTON_LABEL}
            </button>

            <div onClickCapture={handleListClick}>
                <SettingsList
                    onEdit={handleEdit}
                    onSelect={handleSelect}
                    onUnSelect={handleUnselect}
                    settings={materials}
                    handleReorder={handleReorder}
                    onRemove={handleRemove}
                />
            </div>

            {editingValue && (
                <div className={s.buttonArea}>
                    <ButtonDefault onClick={handleCancel} text={CANCEL_BUTTON_LABEL} />
                    <ButtonAccent
                        disabled={editingValue.name?.length < MIN_MODEL_NAME_LENGTH}
                        onClick={handleSave}
                        text={SAVE_BUTTON_LABEL}
                    />
                </div>
            )}
            {!editingValue && !!selectedOrderNumbers.length && (
                <div className={s.deleteButtonArea}>
                    <ButtonTerritory
                        onClick={handleDelete}
                        text={DELETE_BUTTON_LABEL}
                    />
                </div>
            )}
        </div>
    );
};

export default withProvider(withSettings)(MaterialSettings);
