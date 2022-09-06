// import * as React from 'react';
import { useState } from 'react';
import { AUTH } from './Auth.dictionary';
import s from './Auth.module.scss';
import classNames from 'classnames';
import userIcon from '../../assets/icons/user.svg';
import passwordIcon from '../../assets/icons/password.svg';
import eyeIcon from '../../assets/icons/eye.svg';
import ButtonAccent from '../../components/Buttons/ButtonAccent';
import { InputErrorMessage as ErrorMessage } from './InputErrorMessage';
import { fetchDummyUser, hasError, validation } from './Auth.hooks';

const errors = {
    login: '',
    password: '',
};

const {
    HEADER_TITLE,
    LOGIN_TITLE,
    NAME_PLACEHOLDER,
    PASSWORD_PLACEHOLDER,
    BUTTON_TEXT,
    FOOTER_TEXT1,
    FOOTER_TEXT2,
    LOGIN_ERROR_MESSAGE,
    PASSWORD_ERROR_MESSAGE,
} = AUTH;

const initialState = {
    login: '',
    password: '',
    isShowPassword: false,
    isError: false,
    errors,
    isFetching: false,
};

export const Auth = () => {
    const [state, setState] = useState(initialState);

    const handleShowPassword = () => {
        setState((state) => ({
            ...state,
            isShowPassword: !state.isShowPassword,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const errors = validation(state.login, state.password);
        const isError = hasError(errors);
        if (isError) {
            setState((state) => ({
                ...state,
                isError,
                errors,
            }));
            return;
        }

        setState((state) => ({
            ...state, isFetching: true,
        }));
        const data = fetchDummyUser(state.login, state.password);
        data
            .then ((res) => {
                setState((state) => ({
                    ...state, isFetching: false
                }));
                console.log('res', res); // todo API request
            })
            .catch((e) => {
                if (e === 'error') {
                    const errors = { login: LOGIN_ERROR_MESSAGE, password: PASSWORD_ERROR_MESSAGE };
                    setState((state) => ({
                        ...state,
                        errors,
                        isError: hasError(errors),
                        isFetching: false,
                    }));
                }
            });
    };

    const handleLoginChange = (e) => {
        const errors = {...state.errors, login: ''};
        setState((state) => ({
            ...state,
            login: e.target.value,
            errors,
            isError: hasError(errors),
        }));
    };

    const handlePasswordChange = (e) => {
        const errors = {...state.errors, password: ''};
        setState((state) => ({
            ...state,
            password: e.target.value,
            errors,
            isError: hasError(errors),
        }));
    };

    return (
        <div className={s.authWrapper}>
            <header className={s.authHeader}>
                <h1>{HEADER_TITLE}</h1>
            </header>
            <form className={s.authForm} onSubmit={handleSubmit}>
                <h2>{LOGIN_TITLE}</h2>
                <div className={classNames(s.authFieldContainer, state.errors.login && s.error)}>
                    <img className={s.authFieldContainer_icon} src={userIcon} alt="user" />
                    <input
                        type={'text'}
                        name={'login'}
                        placeholder={NAME_PLACEHOLDER}
                        onChange={handleLoginChange}
                    />
                    {state.errors.login &&
                    <div className={s.authFieldContainer_error}>
                        <ErrorMessage text={state.errors.login} />
                    </div>
                    }
                </div>
                <div className={classNames(s.authFieldContainer, state.errors.password && s.error)}>
                    <img className={s.authFieldContainer_icon} src={passwordIcon} alt="password" />
                    <input
                        type={state.isShowPassword ? 'text' : 'password'}
                        name={'password'}
                        placeholder={PASSWORD_PLACEHOLDER}
                        onChange={handlePasswordChange}
                    />
                    <button
                        className={s.authFieldContainer_eyeButton}
                        onClick={handleShowPassword}
                    >
                        <img src={eyeIcon} alt="eye" />
                    </button>
                    {state.errors.password &&
                    <div className={s.authFieldContainer_error}>
                        <ErrorMessage text={state.errors.password} />
                    </div>
                    }
                </div>
                <div>
                    <ButtonAccent
                        text={BUTTON_TEXT}
                        onClick={handleSubmit}
                        disabled={!(state.login && state.password && !state.isError) || state.isFetching}
                    />
                </div>
            </form>
            <footer className={s.authFooter}>
                <p>{FOOTER_TEXT1}</p>
                <p>{FOOTER_TEXT2}</p>
            </footer>
        </div>
    );
};
