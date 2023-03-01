import React, { useReducer } from 'react';
import s from './ColorAddDialog.module.scss';
import Modal from '../../Modal';
import ModalHeader from '../../Modal/components/ModalHeader/ModalHeader';
import ModalContent from '../../Modal/components/ModalContent/ModalContent';
import ModalFooter from '../../Modal/components/ModalFooter/ModalFooter';
import { ButtonAccent, ButtonDefault } from '../../Buttons';
import PropTypes from 'prop-types';
import { COLOR_ADD_DIALOG_DICTIONARY } from './ColorAddDialog.dictionary';
import { ColorContent } from './components/ColorContent';
import { ColorAddProvider } from './contexts/ColorAddContext';
import { colorReducer } from './store/colorReducer';
import { useDeviceTypeContext } from '../../../contexts/DeviceType';
import { useToasters } from '../../../contexts/ToastersContext';

const {
    CANCEL,
    SAVE,
    TITLE,
    EDITING_TITLE,
    ALREADY_EXISTS
} = COLOR_ADD_DIALOG_DICTIONARY;

const ColorAddDialog = ({ onClose, updateSettings, settingsList, editingModel, setEditingModel }) => {
    const { isMobile } = useDeviceTypeContext();

    const [state, dispatch] = useReducer(colorReducer, editingModel ? editingModel : {
        name: '',
        firstColor: '#fff',
        secondColor: null
    });

    const { showToasterError } = useToasters();

    const handleSave = () => {
        if(settingsList.filter(item => item.name === state.name).length) {
            showToasterError(ALREADY_EXISTS);
            return;
        }

        if(!editingModel) {
            updateSettings([...settingsList.map((item, index) => {
                item.orderNumber = index;
                return item;
            }), { ...state,  orderNumber: settingsList.length }]);
            onClose();
            return;
        }
        updateSettings([
            ...settingsList.map((item) => {
                if(item.name === editingModel.name) {
                    return {
                        ...state
                    };
                }

                return item;
            })
        ]);
        onClose();
    };

    const handleClose = () => {
        if(editingModel) {
            setEditingModel(null);
        }
        onClose();
    };

    return (
        <ColorAddProvider value={{ state, dispatch, handleSave }} >
            <Modal size={ isMobile ? 'fs' : 'sm' } className={s.modal} data-testid={'ColorAddDialog'}>
                <ModalHeader title={editingModel ? EDITING_TITLE : TITLE} onClose={handleClose}/>
                <ModalContent>
                    <ColorContent/>
                </ModalContent>
                <ModalFooter actionButtons={[
                    <ButtonDefault key={1} text={CANCEL} onClick={handleClose}/>,
                    <ButtonAccent key={0} text={SAVE} onClick={handleSave} disabled={!state.name}/>,
                ]}/>
            </Modal>
        </ColorAddProvider>
    );
};

ColorAddDialog.propTypes = {
    onClose: PropTypes.func.isRequired,
    updateSettings: PropTypes.func.isRequired,
    settingsList: PropTypes.array.isRequired,
    editingModel: PropTypes.object,
    setEditingModel: PropTypes.func
};

export default ColorAddDialog;
