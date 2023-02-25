import React from 'react';
import s from './ColorAddDialog.module.scss';
import Modal from '../../Modal';
import ModalHeader from '../../Modal/components/ModalHeader/ModalHeader';
import ModalContent from '../../Modal/components/ModalContent/ModalContent';
import ModalFooter from '../../Modal/components/ModalFooter/ModalFooter';
import { ButtonAccent, ButtonDefault } from '../../Buttons';
import PropTypes from 'prop-types';
import { COLOR_ADD_DIALOG_DICTIONARY } from './ColorAddDialog.dictionary';

const {
    CANCEL,
    SAVE,
    TITLE
} = COLOR_ADD_DIALOG_DICTIONARY;

const ColorAddDialog = ({ onClose }) => {
    return (
        <Modal size={'sm'}>
            <ModalHeader title={TITLE} onClose={onClose}/>
            <ModalContent>
                <div className={s.LeaveConfirmationDialog_message}>

                </div>
            </ModalContent>
            <ModalFooter actionButtons={[
                <ButtonDefault key={1} text={CANCEL} onClick={onClose}/>,
                <ButtonAccent key={0} text={SAVE}/>,
            ]}/>
        </Modal>
    );
};

ColorAddDialog.propTypes = {
    onClose: PropTypes.func.isRequired
};

export default ColorAddDialog;
