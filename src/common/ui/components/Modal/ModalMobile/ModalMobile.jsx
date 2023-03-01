import ReactModal from 'react-modal';
import s from './ModalMobile.module.scss';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { useEffect } from 'react';

export const ModalMobile = ({ size, children, className }) =>{

    const sizeMap = new Map(
        [
            ['fs', s.modalMobileSizeFs],
            ['lg', s.modalMobileSizeLg],
            ['md', s.modalMobileSizeMd],
            ['sm', s.modalMobileSizeSm],
        ]
    );
    const sizeClassName = sizeMap.get(size) || s.modalMobileSizeFs;

    useEffect(() => {
        let vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);

        const func = () => {
            // We execute the same script as before
            document.documentElement.style.setProperty('--vh', `${vh}px`);
        };

        window.addEventListener('resize', func);

        return () => {
            window.removeEventListener('resize', func);
        };
    }, []);


    return (
        <ReactModal ariaHideApp={false} isOpen overlayClassName={s.modalOverlay} className={classNames(s.content, sizeClassName, className)}>
            {children}
        </ReactModal>
    );
};

ModalMobile.propTypes = {
    size: PropTypes.string.isRequired,
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ]),
    className: PropTypes.string
};

export default ModalMobile;
