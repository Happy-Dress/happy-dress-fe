import AuthorizationFormDesktop from './AuthorizationFormDesktop';
import React from 'react';
import AuthorizationFormMobile from './AuthorizationFormMobile';
import useAuthorizationForm from '../../hooks/useAuthorizationForm';
import useSignInMediaQuery from '../../hooks/useSignInMediaQuery';


const AuthorizationForm = () => {

    const {
        isMobileWidth,
        isMobileHeight,
        isDesktopWidth,
    } = useSignInMediaQuery();

    const {
        onSubmit,
        register,
        errors,
        isValid,
        isPasswordVisible,
        togglePasswordVisibility
    } = useAuthorizationForm();

    return (
        <>
            {isDesktopWidth && !isMobileHeight && <AuthorizationFormDesktop
                onSubmit={onSubmit}
                register={register}
                errors={errors}
                isValid={isValid}
                isPasswordVisible={isPasswordVisible}
                togglePasswordVisibility={togglePasswordVisibility}
            />}
            {(isMobileWidth || isMobileHeight) && <AuthorizationFormMobile
                onSubmit={onSubmit}
                register={register}
                errors={errors}
                isValid={isValid}
                isPasswordVisible={isPasswordVisible}
                togglePasswordVisibility={togglePasswordVisibility}
            />}
        </>
    );
};

export default AuthorizationForm;