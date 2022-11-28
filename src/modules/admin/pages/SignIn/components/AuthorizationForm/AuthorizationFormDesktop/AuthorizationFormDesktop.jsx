import React from 'react';
import s from './AuthorizationFormDesktop.module.scss';
import { AUTHORIZATION_FORM_DICTIONARY } from '../AuthorizationForm.dictionary';
import person from '../../../../../../../assets/images/person.svg';
import arrowRight from '../../../../../../../assets/images/arrowRight.svg';
import { ErrorMessage } from '@hookform/error-message';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import ButtonAccent from '../../../../../../../common/components/Buttons/ButtonAccent';
import closedEye from '../../../../../../../assets/images/closedEye.svg';
import openEye from '../../../../../../../assets/images/openEye.svg';


const {
    ENTRY_LABEL,
    HELP_YOUR_NAME_LABEL,
    HELP_PASSWORD_LABEL,
    BUTTON_ENTER_LABEL,
    MAX_LOGIN_LENGTH,
    MAX_PASSWORD_LENGTH,
} = AUTHORIZATION_FORM_DICTIONARY;

const AuthorizationFormDesktop = ({
    isPasswordVisible,
    onSubmit,
    errors,
    register,
    togglePasswordVisibility,
    isValid
}) => {

    const passwordIcon = isPasswordVisible ? openEye : closedEye;
    const passwordInputType = isPasswordVisible ? 'text' : 'password';
    
    const renderErrorMessage = (name) =>{
        return (
            <ErrorMessage
                errors={errors}
                name={name}
                render={({ message }) =>
                    <div className={s.Form_input_fields_error}>
                        <p>{message}</p>
                    </div>
                }
            />
        );
    };

    return (
        <div className={s.Container}>
            <form className={s.Form} onSubmit={onSubmit}>
                <div className={s.Form_entry_label}>
                    <h2>{ENTRY_LABEL}</h2>
                </div>
                <div className={s.Form_input_fields}>
                    <div>
                        <div className={
                            classNames(
                                s.Form_input_fields_input,
                                errors.login?.message ? s.Form_input_fields_input_invalid : s.Form_input_fields_input_valid
                            )
                        }>
                            <img className={s.Form_input_fields_img_input}
                                src={person}
                                alt="person"/>
                            <input type="text"
                                placeholder={HELP_YOUR_NAME_LABEL}
                                maxLength={MAX_LOGIN_LENGTH}
                                autoCapitalize={'none'}
                                autoFocus
                                {...register('login')}/>
                        </div>
                        {renderErrorMessage('login')}
                    </div>
                    <div>
                        <div>
                            <div
                                className={classNames(
                                    s.Form_input_fields_input,
                                    s.Form_input_fields_input_password,
                                    errors.password?.message ? s.Form_input_fields_input_invalid : s.Form_input_fields_input_valid
                                )
                                }>
                                <img className={s.Form_input_fields_img_input}
                                    src={arrowRight}
                                    alt="arrowRight"/>
                                <input type={passwordInputType}
                                    placeholder={HELP_PASSWORD_LABEL}
                                    maxLength={MAX_PASSWORD_LENGTH}
                                    {...register('password')}/>
                                <img src={passwordIcon}
                                    onClick={togglePasswordVisibility}
                                    alt="visibility icon"/>
                            </div>
                            {renderErrorMessage('password')}
                        </div>
                    </div>
                </div>
                <ButtonAccent text={BUTTON_ENTER_LABEL} disabled={!isValid}/>
            </form>
        </div>
    );
};


AuthorizationFormDesktop.propTypes = {
    onSubmit: PropTypes.func.isRequired,
    errors: PropTypes.object.isRequired,
    register: PropTypes.func.isRequired,
    isValid: PropTypes.bool.isRequired,
    isPasswordVisible: PropTypes.bool.isRequired,
    togglePasswordVisibility: PropTypes.func.isRequired
};

export default AuthorizationFormDesktop;