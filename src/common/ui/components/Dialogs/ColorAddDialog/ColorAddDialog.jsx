import React, { useReducer } from 'react';
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

const {
    CANCEL,
    SAVE,
    TITLE
} = COLOR_ADD_DIALOG_DICTIONARY;

const ColorAddDialog = ({ onClose, updateColors, settingsList, editingModel, setEditingModel }) => {
    const [state, dispatch] = useReducer(colorReducer, editingModel ? editingModel : {
        name: '',
        firstColor: '#fff',
        secondColor: null
    });

    const handleSave = () => {
        if(!editingModel) {
            updateColors([...settingsList.map((item, index) => {
                item.orderNumber = index;
                return item;
            }), { ...state,  orderNumber: settingsList.length }]);
            onClose();
            return;
        }
        updateColors([
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
        <ColorAddProvider value={{ state, dispatch, handleSave }}>
            <Modal size={'sm'}>
                <ModalHeader title={TITLE} onClose={handleClose}/>
                <ModalContent>
                    <ColorContent/>
                </ModalContent>
                <ModalFooter actionButtons={[
                    <ButtonDefault key={1} text={CANCEL} onClick={handleClose}/>,
                    <ButtonAccent key={0} text={SAVE} onClick={handleSave}/>,
                ]}/>
            </Modal>
        </ColorAddProvider>
    );
};

ColorAddDialog.propTypes = {
    onClose: PropTypes.func.isRequired,
    updateColors: PropTypes.func.isRequired,
    settingsList: PropTypes.array.isRequired,
    editingModel: PropTypes.object,
    setEditingModel: PropTypes.func
};

export default ColorAddDialog;
