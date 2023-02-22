import Modal from '../../Modal';
import PropTypes from 'prop-types';
import ModalHeader from '../../Modal/components/ModalHeader/ModalHeader';
import ModalFooter from '../../Modal/components/ModalFooter/ModalFooter';
import { ButtonAccent, ButtonDefault } from '../../Buttons';
import ModalContent from '../../Modal/components/ModalContent/ModalContent';
import s from './LeaveConfirmationDialog.module.scss';
import { LEAVE_CONFIRMATION_DICTIONARY } from './LeaveConfirmationDialog.dictionary';


const {
    SUBMIT_BUTTON,
    CANCEL_BUTTON,
    TITLE,
    MESSAGE_HEADER,
    MESSAGE_BODY
} = LEAVE_CONFIRMATION_DICTIONARY;

const LeaveConfirmationDialog = ({ onClose, onSubmit }) =>{
    return(
        <Modal size='sm'>
            <ModalHeader onClose={onClose} title={TITLE}/>
            <ModalContent>
                <div className={s.LeaveConfirmationDialog_message}>
                    <span >{MESSAGE_HEADER}</span>
                    <span >{MESSAGE_BODY}</span>
                </div>

            </ModalContent>
            <ModalFooter actionButtons={[
                <ButtonDefault onClick={onClose} key={1} text={CANCEL_BUTTON} />,
                <ButtonAccent onClick={onSubmit} key={0} text={SUBMIT_BUTTON}/>,
            ]}/>
        </Modal>
    );
};

LeaveConfirmationDialog.propTypes = {
    onClose: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
};

export default LeaveConfirmationDialog;
