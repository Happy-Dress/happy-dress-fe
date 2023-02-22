import ReactModal from 'react-modal';
import s from './ModalMobile.module.scss';
import PropTypes from 'prop-types';
import classNames from 'classnames';

export const ModalMobile = ({ size, children }) =>{

    const sizeMap = new Map(
        [
            ['fs', s.modalMobileSizeFs],
            ['lg', s.modalMobileSizeLg],
            ['md', s.modalMobileSizeMd],
            ['sm', s.modalMobileSizeSm],
        ]
    );
    const sizeClassName = sizeMap.get(size) || s.modalMobileSizeFs;


    return (
        <ReactModal isOpen overlayClassName={s.modalOverlay} className={classNames(s.content, sizeClassName)}>
            {children}
        </ReactModal>
    );
};

ModalMobile.propTypes = {
    size: PropTypes.string.isRequired,
    children: PropTypes.element
};

export default ModalMobile;
