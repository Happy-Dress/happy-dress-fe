import AuthorizationFormDesktop from './AuthorizationFormDesktop/AuthorizationFormDesktop';
import React, { useState } from 'react';
import AuthorizationFormMobile from './AuthorizationFormMobile';
import { useMediaQuery } from 'react-responsive';
import axios from 'axios';
import { AUTHORIZATION_FORM_DICTIONARY } from './AuthorizationFormDesktop/AuthorizationFormDesktop.dictionary';
import closedEye from '../../../../../../assets/images/closedEye.svg';
import openEye from '../../../../../../assets/images/openEye.svg';
import useSignInForm from './hooks/useSignInForm';

const {

    WRONG_LOGIN,
    WRONG_PASSWORD,
    POST_PATH,
} = AUTHORIZATION_FORM_DICTIONARY;

const AuthorizationForm = () => {

    const DESKTOP_MIN_SCREEN_SIZE = '426px';
    const isDesktop = useMediaQuery({ query: `(min-width: ${DESKTOP_MIN_SCREEN_SIZE})` });
    const isMobile = useMediaQuery({ query: `(max-width: ${DESKTOP_MIN_SCREEN_SIZE})` });

    const [toggleIcon, setToggleIcon] = useState(closedEye);
    const [type, setType] = useState('password');

    const [register, setError, errors, isValid, handleSubmit] = useSignInForm();

    const onSubmit = async (data) => {
        axios.post(POST_PATH, {
            login: data.login,
            password: data.password,
        }).then((result) => localStorage.setItem('Authorization', `Bearer ${result.data.accessToken}`))
            .catch(() => {
                setError('login', {
                    message: WRONG_LOGIN,
                });
                setError('password', {
                    message: WRONG_PASSWORD,
                });
            });
    };

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
            {isMobile && <AuthorizationFormMobile/>}
        </>
    );
};

export default AuthorizationForm;