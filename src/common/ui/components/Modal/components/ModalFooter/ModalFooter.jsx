import React from 'react';
import PropTypes from 'prop-types';
import { ButtonAccent, ButtonDefault } from '../../../../../../common/ui/components';
import s from './ModalFooter.module.scss';

export const ModalFooter = ({ cancelButtonText, okButtonText, onOk, onClose }) => {
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

    const handleOk = async () => {
        if (onOk) {
            await onOk();
        }
    };

    return (
        <div className={s.ModalFooter}>
            <ButtonDefault text={cancelButtonText} onClick={handleClose} />
            <ButtonAccent text={okButtonText} onClick={handleOk} />
        </div>
    );
};

ModalFooter.propTypes = {
    onOk: PropTypes.func.isRequired,
    onClose: PropTypes.func.isRequired,
    okButtonText: PropTypes.string,
    cancelButtonText: PropTypes.string,
};
