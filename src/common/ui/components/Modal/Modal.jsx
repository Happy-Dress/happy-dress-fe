import s from './Modal.module.scss';
import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { ModalHeader } from './components/ModalHeader';
import { ModalFooter } from './components/ModalFooter';
import { ModalContent } from './components/ModalContent';
import cls from 'classnames';

export const Modal = ({
    onOk,
    onClose,
    children,
    cancelButtonText,
    okButtonText,
    title,
    size,
    isOpen,
}) => {
    const el = document.createElement('div');
    el.id = 'modal-root';

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
            document.body.appendChild(el);
        }

        return () => {
            document.body.removeAttribute('style');
            el.remove();
        };
    }, [isOpen]);

    if (!title) {
        title = '';
    }

    if (!cancelButtonText) {
        cancelButtonText = 'Cancel';
    }

    if (!okButtonText) {
        okButtonText = 'Ok';
    }

    const handleClose = async () => {
        if (onClose) {
            await onClose();
        }
    };

    if (isOpen) {
        return (
            createPortal(
                <div className={s.modalRoot}>
                    <div className={s.modalMask} />
                    <div className={s.modalWrapper}>
                        <div className={cls(s.modalBody, s[size])}>
                            <ModalHeader title={title} onClose={handleClose} />
                            <ModalContent>
                                {children}
                            </ModalContent>
                            <ModalFooter
                                okButtonText={okButtonText}
                                cancelButtonText={cancelButtonText}
                                onClose={onClose}
                                onOk={onOk}
                            />
                        </div>
                    </div>
                </div>,
                el
            )
        );
    } else return null;
};

Modal.propTypes = {
    onOk: PropTypes.func,
    onClose: PropTypes.func,
    children: PropTypes.any,
    title: PropTypes.string,
    okButtonText: PropTypes.string,
    cancelButtonText: PropTypes.string,
    size: PropTypes.oneOf(['sm', 'md', 'lg']),
    isOpen: PropTypes.bool,
};
