import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import s from './AuthorizationFormDesktop.module.scss';
import { AUTHORIZATION_FORM_DICTIONARY } from './AuthorizationFormDesktop.dictionary';
import person from '../../../../../../../assets/images/person.svg';
import arrowRight from '../../../../../../../assets/images/arrowRight.svg';
import openEye from '../../../../../../../assets/images/openEye.svg';
import closedEye from '../../../../../../../assets/images/closedEye.svg';
import axios from 'axios';
import { ErrorMessage } from '@hookform/error-message';
import classNames from 'classnames';

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
    WRONG_LOGIN,
    TOO_SHORT_PASSWORD_MESSAGE,
    TOO_LONG_PASSWORD_MESSAGE,
    WRONG_PASSWORD,
    POST_PATH,
} = AUTHORIZATION_FORM_DICTIONARY;

const authorizationCredentials = z.object({
    login: z.string().min(MIN_CREDS_LENGTH, TOO_SHORT_LOGIN_MESSAGE).max(MAX_LOGIN_LENGTH, TOO_LONG_LOGIN_MESSAGE),
    password: z.string().min(MIN_CREDS_LENGTH, TOO_SHORT_PASSWORD_MESSAGE).max(MAX_PASSWORD_LENGTH, TOO_LONG_PASSWORD_MESSAGE),
});

const AuthorizationFormDesktop = () => {
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
        <div className={s.Container}>
            <form className={s.Form} onSubmit={handleSubmit(onSubmit)}>
                <div className={s.Form_entry_label}>
                    <h2>{ENTRY_LABEL}</h2>
                </div>
                <div className={s.Form_input_fields}>
                    <div>
                        <div
                            className={classNames(s.Form_input_fields_input, errors.login?.message ? 
                                s.Form_input_fields_input_invalid : s.Form_input_fields_input_valid)}>
                            <img className={s.Form_img_input} src={person} alt="person"/>
                            <input type="text" placeholder={HELP_YOUR_NAME_LABEL}
                                maxLength={MAX_LOGIN_LENGTH} {...register('login')}/>
                        </div>
                        <ErrorMessage
                            errors={errors}
                            name="login"
                            render={({ message }) => <div style={{ paddingTop: 10, color: 'red', height: 30 }}>
                                <p>{message}</p>
                            </div>}
                        />
                    </div>
                    <div>
                        <div>
                            <div
                                className={classNames(s.Form_input_fields_input, s.Form_input_fields_input, s.Form_input_fields_input_password, errors.password?.message ? s.Form_input_fields_input_invalid : s.Form_input_fields_input_valid)}>
                                <img className={s.Form_img_input} src={arrowRight} alt="arrowRight"/>
                                <input type={type} placeholder={HELP_PASSWORD_LABEL}
                                    maxLength={MAX_PASSWORD_LENGTH} {...register('password')}/>
                                <img src={toggleIcon} onClick={changeVisibility} alt="visibility icon"/><br/>
                            </div>
                            <ErrorMessage
                                errors={errors}
                                name="password"
                                render={({ message }) => <div style={{ paddingTop: 10, color: 'red', height: 30 }}>
                                    <p>{message}</p>
                                </div>}
                            />
                        </div>
                    </div>
                </div>
                <button className={s.Form_btn} type="submit" disabled={!isValid}>{BUTTON_ENTER_LABEL}</button>
            </form>
        </div>
    );
};

export default AuthorizationFormDesktop;