import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import s from './AuthorizationForm.module.scss';
import { AUTHORIZATION_FORM_DICTIONARY } from './AuthorizationForm.dictionary';
import person from '../../../../../../assets/images/person.svg';
import arrowRight from '../../../../../../assets/images/arrowRight.svg';
import openEye from '../../../../../../assets/images/openEye.svg';
import closedEye from '../../../../../../assets/images/closedEye.svg';
import axios from 'axios';

const {
    ENTRY_LABEL,
    HELP_YOUR_NAME_LABEL,
    HELP_PASSWORD_LABEL,
    BUTTON_ENTER_LABEL,
    MIN_CREDS_LENGTH,
    MAX_LOGIN_LENGTH,
    MAX_PASSWORD_LENGTH,
    TOO_SHORT_LOGIN_MESSAGE,
    TOO_LONG_LOGIN_MESSAGE,
    TOO_SHORT_PASSWORD_MESSAGE,
    TOO_LONG_PASSWORD_MESSAGE,
    POST_PATH,
} = AUTHORIZATION_FORM_DICTIONARY;

const authorizationCredentials = z.object({
    login: z.string().min(MIN_CREDS_LENGTH, TOO_SHORT_LOGIN_MESSAGE).max(MAX_LOGIN_LENGTH, TOO_LONG_LOGIN_MESSAGE),
    password: z.string().min(MIN_CREDS_LENGTH, TOO_SHORT_PASSWORD_MESSAGE).max(MAX_PASSWORD_LENGTH, TOO_LONG_PASSWORD_MESSAGE),
});

const AuthorizationForm = () => {
    const [toggleIcon, setToggleIcon] = useState(closedEye);
    const [type, setType] = useState('password');

    const { register, handleSubmit } = useForm({
        resolver: zodResolver(authorizationCredentials)
    });

    const onSubmit = async (data) => {
        console.log((await axios.post(POST_PATH, {
            login: data.login,
            password: data.password,
        })).data.accessToken);
    };
    const onError = (errors, e) => console.log(errors, e);


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
        <div className={s.Container}>
            <form className={s.Form} onSubmit={handleSubmit(onSubmit, onError)}>
                <div className={s.Form_entry_label}>
                    <h2>{ENTRY_LABEL}</h2>
                </div>
                <div className={s.Form_input}>
                    <img className={s.Form_img_input} src={person} alt="person"/>
                    <input type="text" placeholder={HELP_YOUR_NAME_LABEL} maxLength={MAX_LOGIN_LENGTH} {...register('login')}/>
                </div>
                <div className={`${s.Form_input} ${s.Form_input_password}`}>
                    <img className={s.Form_img_input} src={arrowRight} alt="arrowRight"/>
                    <input type={type} placeholder={HELP_PASSWORD_LABEL} maxLength={MAX_PASSWORD_LENGTH} {...register('password')}/>
                    <img src={toggleIcon} onClick={changeVisibility} alt="visibility icon"/>
                </div>
                <div>
                    <button className={s.Form_btn} type="submit">{BUTTON_ENTER_LABEL}</button>
                </div>
            </form>
        </div>
    );
};

export default AuthorizationForm;