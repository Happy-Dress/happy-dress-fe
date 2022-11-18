import AuthorizationFormDesktop from './AuthorizationFormDesktop';
import React from 'react';
import AuthorizationFormMobile from './AuthorizationFormMobile';
import closedEye from '../../../../../../assets/images/closedEye.svg';
import openEye from '../../../../../../assets/images/openEye.svg';
import useAuthorizationForm from '../../hooks/useAuthorizationForm';
import useSignInMediaQuery from '../../hooks/useSignInMediaQuery';
import authenticateUser from '../../api/authenticateUser';

const AuthorizationForm = () => {
    
    const {
        isMobile,
        isDesktop,
    } = useSignInMediaQuery();

    const { register,
        errors,
        setError,
        isValid,
        handleSubmit,
        toggleIcon,
        setToggleIcon,
        type,
        setType } = useAuthorizationForm(closedEye, 'password');

    const onSubmit = authenticateUser(setError);

    const changeVisibility = () => {
        if (type === 'password') {
            setType('text');
            setToggleIcon(openEye);
        } else {
            setType('password');
            setToggleIcon(closedEye);
        }
    };
    
    return (
        <>
            {isDesktop && <AuthorizationFormDesktop changeVisibility={changeVisibility} onSubmit={onSubmit}
                toggleIcon={toggleIcon}
                type={type} register={register} errors={errors} isValid={isValid}
                handleSubmit={handleSubmit} />}
            {isMobile && <AuthorizationFormMobile changeVisibility={changeVisibility} onSubmit={onSubmit}
                toggleIcon={toggleIcon}
                type={type} register={register} errors={errors} isValid={isValid}
                handleSubmit={handleSubmit}/>}
        </>
    );
};


export default AuthorizationForm;