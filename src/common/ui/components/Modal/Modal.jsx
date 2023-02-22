import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import adaptive from '../../hocs/adaptive';
import ModalDesktop from './ModalDesktop/ModalDesktop';
import ModalMobile from './ModalMobile/ModalMobile';



export const Modal = ({ size, children }) =>{

    const AdaptiveModal = useMemo(() => {
        return adaptive(ModalDesktop, ModalMobile);
    }, []);

    return (
        <AdaptiveModal size={size}>
            {children}
        </AdaptiveModal>
    );
};

Modal.propTypes = {
    size: PropTypes.string.isRequired,
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ])
};

export default Modal;
