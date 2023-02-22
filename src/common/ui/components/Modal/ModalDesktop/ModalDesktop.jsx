import ReactModal from 'react-modal';
import s from './ModalDesktop.module.scss';
import PropTypes from 'prop-types';
import classNames from 'classnames';

export const ModalDesktop = ({ size, children }) =>{

    const sizeMap = new Map(
        [
            ['fs', s.modalDesktopSizeFs],
            ['lg', s.modalDesktopSizeLg],
            ['md', s.modalDesktopSizeMd],
            ['sm', s.modalDesktopSizeSm],
        ]
    );

    const sizeClassName = sizeMap.get(size) || s.modalDesktopSizeFs;

    return (
        <ReactModal isOpen overlayClassName={s.modalOverlay} className={classNames(s.content, sizeClassName)}>
            {children}
        </ReactModal>
    );
};

ModalDesktop.propTypes = {
    size: PropTypes.string.isRequired,
    children: PropTypes.element,
};

export default ModalDesktop;
