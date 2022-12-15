import React from 'react';
import PropTypes from 'prop-types';
import PopUpError from './PopUpError';
import PopUpNotification from './PopUpNotification';
import PopUpSuccess from './PopUpSuccess';
import useSignInMediaQuery from '../../pages/SignIn/hooks/useSignInMediaQuery';
import { usePopUp } from '../../contexts/PopUpContext/hook/usePopUp';

const PopUp = (props) => {

    const isError = props.classification === 'Error';
    const isSuccess = props.classification === 'Success';
    const isNotification = props.classification === 'Notification';

    const { isDesktopWidth, isMobileHeight, isMobileWidth } = useSignInMediaQuery();

    const isDesktop = isDesktopWidth && !isMobileHeight;
    const isMobile = isMobileHeight || isMobileWidth;

    const { closePopUp } = usePopUp();

    return (
        <>
            {isError && <PopUpError text={props.text} device={{ isDesktop, isMobile }} onClose={closePopUp}/>}
            {isSuccess && <PopUpSuccess/>}
            {isNotification && <PopUpNotification/>}
        </>
    );
};

PopUp.propTypes = {
    classification: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
};

export default PopUp;