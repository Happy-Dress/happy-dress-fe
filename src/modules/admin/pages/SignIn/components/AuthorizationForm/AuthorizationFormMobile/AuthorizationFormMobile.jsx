import React from 'react';
import s from './AuthorizationFormMobile.module.scss';
import { AUTHORIZATION_FORM_DICTIONARY } from '../AuthorizationForm.dictionary';
import classNames from 'classnames';
import person from '../../../../../../../common/assets/images/person.svg';
import arrowRight from '../../../../../../../common/assets/images/arrowRight.svg';
import PropTypes from 'prop-types';
import { ErrorMessage } from '@hookform/error-message';
import ButtonAccent from '../../../../../../../common/ui/components/Buttons/ButtonAccent';
import closedEye from '../../../../../../../common/assets/images/closedEye.svg';
import openEye from '../../../../../../../common/assets/images/openEye.svg';


const {
    ENTRY_LABEL,
    HELP_YOUR_NAME_LABEL,
    HELP_PASSWORD_LABEL,
    MAX_LOGIN_LENGTH,
    MAX_PASSWORD_LENGTH,
    BUTTON_ENTER_LABEL,
} = AUTHORIZATION_FORM_DICTIONARY;

const AuthorizationFormMobile = ({
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
        <>
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
                                alt='person'/>
                            <input type='text' 
                                placeholder={HELP_YOUR_NAME_LABEL} 
                                maxLength={MAX_LOGIN_LENGTH} 
                                autoCapitalize={'none'}
                                {...register('login')}/>
                        </div>
                        {renderErrorMessage('login')}
                    </div>
                    <div>
                        <div className={
                            classNames(
                                s.Form_input_fields_input,
                                errors.password?.message ? s.Form_input_fields_input_invalid : s.Form_input_fields_input_valid
                            )
                        }>
                            <img className={s.Form_input_fields_img_input}
                                src={arrowRight}
                                alt='arrow right'/>
                            <input type={passwordInputType}
                                placeholder={HELP_PASSWORD_LABEL}
                                maxLength={MAX_PASSWORD_LENGTH}
                                {...register('password')}/>
                            <img className={s.Form_input_fields_img_input}
                                src={passwordIcon}
                                onClick={togglePasswordVisibility}
                                alt='visibility icon'/>
                        </div>
                        {renderErrorMessage('password')}
                    </div>
                </div>
                <ButtonAccent text={BUTTON_ENTER_LABEL} disabled={!isValid}/>
            </form>
        </>
    );
};

AuthorizationFormMobile.propTypes ={
    onSubmit: PropTypes.func.isRequired,
    errors: PropTypes.object.isRequired,
    register: PropTypes.func.isRequired,
    isValid: PropTypes.bool.isRequired,
    isPasswordVisible: PropTypes.bool.isRequired,
    togglePasswordVisibility: PropTypes.func.isRequired
};

export default AuthorizationFormMobile;
