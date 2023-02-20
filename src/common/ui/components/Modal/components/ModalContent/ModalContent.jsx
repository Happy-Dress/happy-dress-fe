import s from './ModalContent.module.scss';
import PropTypes from 'prop-types';

export const ModalContent = ({ children }) => {
    return (
        <div className={s.modalContent}>
            {children}
        </div>
    );
};

ModalContent.propTypes = {
    children: PropTypes.any,
};
