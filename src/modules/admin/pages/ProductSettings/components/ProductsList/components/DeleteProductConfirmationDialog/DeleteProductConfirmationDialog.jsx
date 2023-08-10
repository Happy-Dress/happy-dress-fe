
import Modal from '../../../../../../../../common/ui/components/Modal/Modal';
import PropTypes from 'prop-types';
import ModalHeader from '../../../../../../../../common/ui/components/Modal/components/ModalHeader/ModalHeader';
import ModalFooter from '../../../../../../../../common/ui/components/Modal/components/ModalFooter/ModalFooter';
import { ButtonAccent, ButtonDefault } from '../../../../../../../../common/ui/components/Buttons';
import ModalContent from '../../../../../../../../common/ui/components/Modal/components/ModalContent/ModalContent';
import s from './DeleteProductConfirmationDialog.module.scss';
import { DELETE_PRODUCT_CONFIRMATION_DIALOG } from './DeleteProductConfirmationDialog.dictionary';

const DeleteProductConfirmationDialog = ({ onClose, onSubmit }) => {
    const { TITLE, MESSAGE_BODY, CANCEL_BUTTON, SUBMIT_BUTTON } = DELETE_PRODUCT_CONFIRMATION_DIALOG;
    return (
        <Modal size='sm'>
            <ModalHeader title={TITLE} onClose={onClose} data-testid='confirm-delete'/>
            <ModalContent>
                <div className={s.LeaveConfirmationDialog_message}>
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
DeleteProductConfirmationDialog.propTypes = {
    onClose: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,

};
export default DeleteProductConfirmationDialog;
