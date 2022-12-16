import React from 'react';
import PropTypes from 'prop-types';
import ToasterError from './ToasterError';
import ToasterNotification from './ToasterNotification';
import ToasterSuccess from './ToasterSuccess';
import useSignInMediaQuery from '../../pages/SignIn/hooks/useSignInMediaQuery';
import { useToaster } from '../../contexts/ToasterContext';

const Toaster = (props) => {

    const isError = props.classification === 'Error';
    const isSuccess = props.classification === 'Success';
    const isNotification = props.classification === 'Notification';

    const { isDesktopWidth, isMobileHeight, isMobileWidth } = useSignInMediaQuery();

    const isDesktop = isDesktopWidth && !isMobileHeight;
    const isMobile = isMobileHeight || isMobileWidth;

    const { closeToster } = useToaster();

    return (
        <>
            {isError && <ToasterError
                text={props.text}
                device={{ isDesktop, isMobile }}
                onClose={closeToster}/>}
            {isSuccess && <ToasterSuccess
                text={props.text}
                device={{ isDesktop, isMobile }}
                onClose={closeToster}/>}
            {isNotification && <ToasterNotification
                text={props.text}
                device={{ isDesktop, isMobile }}
                onClose={closeToster}/>}
        </>
    );
};

Toaster.propTypes = {
    classification: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
};

export default Toaster;