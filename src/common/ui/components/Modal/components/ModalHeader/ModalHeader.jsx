import PropTypes from 'prop-types';
import s from './ModalHeader.module.scss';
import { ReactComponent as Cross } from '../../../../../assets/images/x.svg';


const ModalHeader = ({ title, onClose }) =>{

    return(
        <div className={s.ModalHeader}>
            <div className={s.ModalHeader_modalTitle}>
                <span>{title}</span>
            </div>
            <Cross className={s.ModalHeader_cross} onClick={onClose}/>
        </div>
    );

};

ModalHeader.propTypes = {
    title: PropTypes.string.isRequired,
    onClose: PropTypes.func.isRequired
};


export default ModalHeader;
