import React from 'react';
import PropTypes from 'prop-types';
import TosterError from './TosterError';
import TosterNotification from './TosterNotification';
import TosterSuccess from './TosterSuccess';
import useSignInMediaQuery from '../../pages/SignIn/hooks/useSignInMediaQuery';
import { useToster } from '../../contexts/TosterContext/hook/useToster';

const Toster = (props) => {

    const isError = props.classification === 'Error';
    const isSuccess = props.classification === 'Success';
    const isNotification = props.classification === 'Notification';

    const { isDesktopWidth, isMobileHeight, isMobileWidth } = useSignInMediaQuery();

    const isDesktop = isDesktopWidth && !isMobileHeight;
    const isMobile = isMobileHeight || isMobileWidth;

    const { closePopUp } = useToster();

    return (
        <>
            {isError && <TosterError
                text={props.text}
                device={{ isDesktop, isMobile }}
                onClose={closePopUp}/>}
            {isSuccess && <TosterSuccess
                text={props.text}
                device={{ isDesktop, isMobile }}
                onClose={closePopUp}/>}
            {isNotification && <TosterNotification
                text={props.text}
                device={{ isDesktop, isMobile }}
                onClose={closePopUp}/>}
        </>
    );
};

Toster.propTypes = {
    classification: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
};

export default Toster;