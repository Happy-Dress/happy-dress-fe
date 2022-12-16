import React from 'react';
import closeIcon from '../../../../../assets/images/closeIcon.svg';
import notificationIcon from '../../../../../assets/images/notificationIcon.svg';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import s from './ToasterNotification.module.scss';

const ToasterNotification = (props) => {

    const isDesktop = props.device.isDesktop;
    const isMobile = props.device.isMobile;

    return (
        <div
            className={classNames(s.container, isDesktop ? s.container_desktop : '', isMobile ? s.container_mobile : '')}>
            <div className={s.container_icons}>
                <img src={notificationIcon} alt="notification icon"/>
                <button onClick={props.onClose}><img src={closeIcon} alt="close icon"/></button>
            </div>
            <div
                className={classNames(isMobile ? s.container_mobile_message : '',
                    isDesktop ? s.container_desktop_message : '')}>
                <p>{props.text}</p>
            </div>
        </div>

    );
};

ToasterNotification.propTypes = {
    text: PropTypes.string.isRequired,
    device: PropTypes.object.isRequired,
    onClose: PropTypes.func.isRequired,
};

export default ToasterNotification;