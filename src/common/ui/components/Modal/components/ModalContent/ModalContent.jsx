import s from './ModalContent.module.scss';
import PropTypes from 'prop-types';


const ModalContent = ({ children }) =>{
    return (
        <div className={s.ModalContent}>{children}</div>
    );
};

ModalContent.propTypes = {
    children: PropTypes.element,
};

export default ModalContent;
