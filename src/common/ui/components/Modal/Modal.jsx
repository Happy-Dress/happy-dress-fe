import PropTypes from 'prop-types';

import adaptive from '../../hocs/adaptive';
import ModalDesktop from './ModalDesktop/ModalDesktop';
import ModalMobile from './ModalMobile/ModalMobile';

export const Modal = ({ size, children }) =>{
    const AdaptiveModal = adaptive(ModalDesktop, ModalMobile);
    return (
        <AdaptiveModal size={size}>
            {children}
        </AdaptiveModal>
    );
};

Modal.propTypes = {
    size: PropTypes.string.isRequired,
    children: PropTypes.element
};

export default Modal;
