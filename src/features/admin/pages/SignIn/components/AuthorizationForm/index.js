import AuthorizationFormDesktop from './AuthorizationFormDesktop/AuthorizationFormDesktop';
import { useDeviceTypeContext } from '../../../../../../common/contexts/DeviceType';
import React from 'react';
import AuthorizationFormMobile from './AuthorizationFormMobile';

const AuthorizationForm = () => {

    const { isDesktop, isMobile } = useDeviceTypeContext();

    return (
        <>
            {isDesktop && <AuthorizationFormDesktop />}
            {isMobile && <AuthorizationFormMobile />}
        </>
    );
};

export default AuthorizationForm;