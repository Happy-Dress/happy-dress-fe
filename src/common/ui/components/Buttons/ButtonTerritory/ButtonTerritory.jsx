import PropTypes from 'prop-types';
import s from './ButtonTerritory.module.scss';
import classNames from 'classnames';

const ButtonTerritory = ({ text, onClick, classes =[] }) =>{
    return (
        <button onClick={onClick} className={classNames(s.ButtonTerritory, ...classes)}>
            {text}
        </button>
    );
};

ButtonTerritory.propTypes = {
    text: PropTypes.string.isRequired,
    disabled: PropTypes.bool,
    onClick: PropTypes.func,
    classes: PropTypes.string
};

export default ButtonTerritory;
