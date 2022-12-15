import React from 'react';
import errorIcon from '../../../../../assets/images/errorIcon.svg';
import closeIcon from '../../../../../assets/images/closeIcon.svg';
import PropTypes from 'prop-types';
import s from './PopUpError.module.scss';
import classNames from 'classnames';


const PopUpError = (props) => {

    const isDesktop = props.device.isDesktop;
    const isMobile = props.device.isMobile;

    return (
        <div
            className={classNames(s.container, isDesktop ? s.container_desktop : '', isMobile ? s.container_mobile : '')}>
            <div className={s.container_icons}>
                <img src={errorIcon} alt="error icon"/>
                <button onClick={props.onClose}><img src={closeIcon} alt="close icon"/></button>
            </div>
            <div
                className={classNames(s.container_message, isMobile ? s.container_mobile_message : '',
                    isDesktop ? s.container_desktop_message : '')}>
                <p>{props.text}</p>
            </div>
        </div>
    );
};

PopUpError.propTypes = {
    text: PropTypes.string.isRequired,
    device: PropTypes.object.isRequired,
    onClose: PropTypes.func.isRequired,
};

export default PopUpError;