import s from './ModalHeader.module.scss';
import PropTypes from 'prop-types';
import { ReactComponent as X } from '../../../../../../common/assets/images/x.svg';

export const ModalHeader = ({ title, onClose }) => {
    const handleClose = async () => {
        if (onClose) {
            await onClose();
        }
    };

    return (
        <div className={s.modalHeader}>
            <div className={s.modalHeaderTitle}>
                {title}
            </div>
            <button className={s.modalHeaderCloseButton} onClick={handleClose}>
                <X />
            </button>
        </div>);
};

ModalHeader.propTypes = {
    onClose: PropTypes.func,
    title: PropTypes.string,
};
