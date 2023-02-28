import React, { useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import adaptive from '../../hocs/adaptive';
import ModalDesktop from './ModalDesktop/ModalDesktop';
import ModalMobile from './ModalMobile/ModalMobile';



export const Modal = ({ size, children, className }) =>{

    const AdaptiveModal = useMemo(() => {
        return adaptive(ModalDesktop, ModalMobile);
    }, []);

    useEffect(() => {
        document.body.style.overflowY = 'hidden';

        return () => {
            document.body.style.overflowY = 'unset';
        };
    }, []);

    return (
        <AdaptiveModal size={size} className={className}>
            {children}
        </AdaptiveModal>
    );
};

Modal.propTypes = {
    size: PropTypes.string.isRequired,
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ]),
    className: PropTypes.string
};

export default Modal;
