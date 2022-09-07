import { useState } from 'react';
import { AUTH } from './Auth.dictionary';
import s from './Auth.module.scss';
import classNames from 'classnames';
import userIcon from '../../assets/icons/user.svg';
import passwordIcon from '../../assets/icons/password.svg';
import eyeIcon from '../../assets/icons/eye.svg';
import ButtonAccent from '../../components/Buttons/ButtonAccent';
import { InputErrorMessage as ErrorMessage } from './InputErrorMessage';
import {
    fetchDummyUser,
} from './Auth.hooks';
import { useForm } from 'react-hook-form';
import { schema } from './Auth.validation';
import { yupResolver } from '@hookform/resolvers/yup';

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
    isShowPassword: false,
    isFetching: false,
};

export const Auth = () => {
    const [state, setState] = useState(initialState);
    const {
        register,
        handleSubmit,
        formState: { errors },
        setError,
    } = useForm({
        resolver: yupResolver(schema)
    });

    const handleShowPassword = () => {
        setState((state) => ({
            ...state,
            isShowPassword: !state.isShowPassword,
        }));
    };

    const onSubmit = async (formData) => {

        setState((state) => ({
            ...state, isFetching: true,
        }));

        if (formData?.login && formData?.password) {
            const data = fetchDummyUser(formData?.login ?? '', formData?.password ?? '');
            console.log('dummmy data', data);
            data
                .then((res) => {
                    setState((state) => ({
                        ...state, isFetching: false
                    }));
                    console.log('res', res); // todo API request
                })
                .catch((e) => {
                    console.log('err', e);
                    if (e === 'error') {

                        setState((state) => ({
                            ...state,
                            isFetching: false,
                        }));
                        setError('login', { message: LOGIN_ERROR_MESSAGE });
                        setError('password', { message: PASSWORD_ERROR_MESSAGE });
                    }
                });
        }

    };

    return (
        <div className={s.authWrapper}>
            <header className={s.authHeader}>
                <h1>{HEADER_TITLE}</h1>
            </header>
            <form className={s.authForm} onSubmit={handleSubmit(onSubmit)}>
                <h2>{LOGIN_TITLE}</h2>
                <div className={classNames(s.authFieldContainer, errors.login?.message && s.error)}>
                    <img className={s.authFieldContainer_icon} src={userIcon} alt="user" />
                    <input
                        type={'text'}
                        name={'login'}
                        placeholder={NAME_PLACEHOLDER}
                        {...register('login', { required: true })}
                    />
                    {errors.login &&
                    <div className={s.authFieldContainer_error}>
                        <ErrorMessage text={errors.login?.message} />
                    </div>
                    }
                </div>
                <div className={classNames(s.authFieldContainer, errors.password?.message && s.error)}>
                    <img className={s.authFieldContainer_icon} src={passwordIcon} alt="password" />
                    <input
                        type={state.isShowPassword ? 'text' : 'password'}
                        name={'password'}
                        placeholder={PASSWORD_PLACEHOLDER}
                        {...register('password', { required: true })}
                    />
                    <button
                        className={s.authFieldContainer_eyeButton}
                        onClick={handleShowPassword}
                        type={'button'}
                    >
                        <img src={eyeIcon} alt="eye" />
                    </button>
                    {errors.password &&
                    <div className={s.authFieldContainer_error}>
                        <ErrorMessage text={errors.password?.message} />
                    </div>
                    }
                </div>
                <div>
                    <ButtonAccent
                        text={BUTTON_TEXT}
                        onClick={onSubmit}
                        disabled={!!Object.values(errors).length}
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
