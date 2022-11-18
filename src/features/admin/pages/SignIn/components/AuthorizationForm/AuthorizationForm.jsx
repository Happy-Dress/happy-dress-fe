import AuthorizationFormDesktop from './AuthorizationFormDesktop/AuthorizationFormDesktop';
import React, { useState } from 'react';
import AuthorizationFormMobile from './AuthorizationFormMobile';
import { useMediaQuery } from 'react-responsive';
import axios from 'axios';
import { AUTHORIZATION_FORM_DICTIONARY } from './AuthorizationForm.dictionary';
import closedEye from '../../../../../../assets/images/closedEye.svg';
import openEye from '../../../../../../assets/images/openEye.svg';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

const {
    MIN_CREDS_LENGTH,
    TOO_SHORT_LOGIN_MESSAGE,
    MAX_LOGIN_LENGTH,
    TOO_LONG_LOGIN_MESSAGE,
    TOO_SHORT_PASSWORD_MESSAGE,
    MAX_PASSWORD_LENGTH,
    TOO_LONG_PASSWORD_MESSAGE,
    WRONG_LOGIN,
    WRONG_PASSWORD,
    POST_PATH,
} = AUTHORIZATION_FORM_DICTIONARY;

const authorizationCredentials = z.object({
    login: z.string().min(MIN_CREDS_LENGTH, TOO_SHORT_LOGIN_MESSAGE).max(MAX_LOGIN_LENGTH, TOO_LONG_LOGIN_MESSAGE),
    password: z.string().min(MIN_CREDS_LENGTH, TOO_SHORT_PASSWORD_MESSAGE).max(MAX_PASSWORD_LENGTH, TOO_LONG_PASSWORD_MESSAGE),
});

const AuthorizationForm = () => {

    const DESKTOP_MIN_SCREEN_SIZE = '767px';
    const isDesktop = useMediaQuery({ query: `(min-width: ${DESKTOP_MIN_SCREEN_SIZE})` });
    const isMobile = useMediaQuery({ query: `(max-width: ${DESKTOP_MIN_SCREEN_SIZE})` });

    const [toggleIcon, setToggleIcon] = useState(closedEye);
    const [type, setType] = useState('password');

    const { register, setError, formState: { errors, isValid }, handleSubmit } = useForm({
        mode: 'onBlur',
        resolver: zodResolver(authorizationCredentials)
    });
    
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
            {isMobile && <AuthorizationFormMobile changeVisibility={changeVisibility} onSubmit={onSubmit}
                toggleIcon={toggleIcon}
                type={type} register={register} errors={errors} isValid={isValid}
                handleSubmit={handleSubmit}/>}
        </>
    );
};

export default AuthorizationForm;