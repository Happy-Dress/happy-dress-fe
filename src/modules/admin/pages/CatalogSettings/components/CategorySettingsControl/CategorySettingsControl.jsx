import React, { useState } from 'react';
import SettingsList from '../SettingsList';
import s from './CategorySettingsControl.module.scss';
import { ButtonAccent, ButtonDefault, ButtonTerritory } from '../../../../../../common/ui/components/Buttons';
import classNames from 'classnames';
import {  SIMPLE_SETTINGS_CONTROL_DICTIONARY } from './CategorySettingsControl.dictionary';
import PropTypes from 'prop-types';
import { useModal } from 'react-modal-hook';
import CategoryDialog from '../CategoryDialog';

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

const TITLE_1 = 'Добавление категории';
const TITLE_2 = 'Редактирование категории';

// const Dialog = ({ title }) => {
//     console.log('Dialog title', title);
//     return (
//         <CategoryDialog
//             // onClose={hideAddModal}
//             // onSubmit={restoreCategory}
//             title={title}
//         />
//     );
// };
//
// Dialog.propTypes = {
//     title: PropTypes.string,
// };

export const CategorySettingsControl = ({ updateSettings, settingsList }) => {

    const [editingModel, setEditingModel] = useState();
    const [selectedOrderNumbers, setSelectedOrderNumbers] = useState([]);
    const [isExists, setIsExists] = useState(false);

    const restoreCategory = () =>{
        hideModal();
        // restoreSettings(() =>{
        //     showToasterNotification(CHANGES_RESTORED);
        // });
        console.log('Submit');
    };

    const [title, setTitle] = useState(TITLE_1);

    const [showModal, hideModal] = useModal(() => (
        <CategoryDialog
            onClose={hideModal}
            onSubmit={restoreCategory}
            title={title}
        />
    ));

    const handleAdd = () =>{
        setTitle(TITLE_2);
        showModal(); // parameters
    };

    const handleEdit = async () => {
        await setTitle('Edit');
        showModal();
    };

    // const [showAddModal, hideAddModal] = useModal(() => (
    //     // <CategoryDialog
    //     //     onClose={hideAddModal}
    //     //     onSubmit={restoreCategory}
    //     //     title={title}
    //     // />
    //     <Dialog
    //         title={title}
    //     />
    // ));

    // useEffect(() => {
    //     const [showAddModal, hideAddModal] = useModal(() => (
    //         <Dialog
    //             // title={title}
    //         />
    //     ));
    //
    //     // return [showAddModal, hideAddModal];
    // }, [title]);

    // const [showEditModal, hideEditModal] = useModal(() => (
    //     // <CategoryDialog
    //     //     onClose={hideEditModal}
    //     //     onSubmit={restoreCategory}
    //     //     // title={TITLE_2}
    //     //     title={title}
    //     // />
    //     // <Dialog
    //     //     title={title}
    //     // />
    // ));

    // const showModalWithTitle = (title) => {
    //     const [showEditModal, hideEditModal] = useModal(() => (
    //         <CategoryDialog
    //             onClose={hideEditModal}
    //             onSubmit={restoreCategory}
    //             title={title}
    //         />
    //     ));
    //
    //     showEditModal();
    //     // return showEditModal();
    // };

    const handleReorder = (reorderedModels) => {
        updateSettings(reorderedModels);
    };

    // const handleEdit = (model) => {
    //     console.log('edit- to show modal');
    //     setTitle('Edit');
    //     showModal();
    //
    //     console.log('title', title);
    //     // await showEditModal();
    // };

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
            <button onClick={handleAdd}
                className={classNames(
                    s.addButton, 
                )}
            >
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

CategorySettingsControl.propTypes = {
    settingsList: PropTypes.array.isRequired,
    updateSettings: PropTypes.func.isRequired,
};

export default CategorySettingsControl;
