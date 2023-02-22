import PropTypes from 'prop-types';
import s from './ModalFooter.module.scss';


const ModalFooter = ({ actionButtons }) =>{
    return (
        <div className={s.ModalFooter}>
            {actionButtons}
        </div>
    );
};

ModalFooter.propTypes = {
    actionButtons: PropTypes.array,
};

export default ModalFooter;
