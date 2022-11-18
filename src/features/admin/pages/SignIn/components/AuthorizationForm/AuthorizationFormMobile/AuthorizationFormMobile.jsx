import React from 'react';
import s from './AuthorizationFormMobile.module.scss';
import { AUTHORIZATION_FORM_DICTIONARY } from '../AuthorizationForm.dictionary';
import classNames from 'classnames';
import person from '../../../../../../../assets/images/person.svg';
import arrowRight from '../../../../../../../assets/images/arrowRight.svg';
import PropTypes from 'prop-types';
import { ErrorMessage } from '@hookform/error-message';

const {
    ENTRY_LABEL,
    HELP_YOUR_NAME_LABEL,
    HELP_PASSWORD_LABEL,
    MAX_LOGIN_LENGTH,
    MAX_PASSWORD_LENGTH,
    BUTTON_ENTER_LABEL,
} = AUTHORIZATION_FORM_DICTIONARY;

const AuthorizationFormMobile = (props) => {

    AuthorizationFormMobile.propTypes ={
        onSubmit: PropTypes.element.isRequired,
        handleSubmit: PropTypes.element.isRequired,
        errors: PropTypes.element.isRequired,
        register: PropTypes.element.isRequired,
        changeVisibility: PropTypes.element.isRequired,
        type: PropTypes.element.isRequired,
        isValid: PropTypes.element.isRequired,
        toggleIcon: PropTypes.element.isRequired,
    };
    
    return (
        <>
            <form className={s.Form} onSubmit={props.handleSubmit(props.onSubmit)}>
                <div className={s.Form_entry_label}>
                    <h2>{ENTRY_LABEL}</h2>
                </div>
                <div className={s.Form_input_fields}>
                    <div>
                        <div className={classNames(s.Form_input_fields_input, props.errors.login?.message ?
                            s.Form_input_fields_input_invalid : s.Form_input_fields_input_valid)}>
                            <img className={s.Form_input_fields_img_input} src={person} alt='person'/>
                            <input type='text' placeholder={HELP_YOUR_NAME_LABEL} maxLength={MAX_LOGIN_LENGTH} {...props.register('login')}/>
                        </div>
                        <ErrorMessage
                            errors={props.errors}
                            name="login"
                            render={({ message }) => 
                                <div className={s.Form_input_fields_error}>
                                    <p>{message}</p>
                                </div>
                            }
                        />
                    </div>
                    <div>
                        <div className={classNames(s.Form_input_fields_input, s.Form_input_fields_input_password, props.errors.password?.message ? s.Form_input_fields_input_invalid : s.Form_input_fields_input_valid)}>
                            <img className={s.Form_input_fields_img_input} src={arrowRight} alt='arrow right'/>
                            <input type={props.type} placeholder={HELP_PASSWORD_LABEL} maxLength={MAX_PASSWORD_LENGTH} {...props.register('password')}/>
                            <img className={s.Form_input_fields_img_input} src={props.toggleIcon} onClick={props.changeVisibility} alt='visibility icon'/>
                        </div>
                        <ErrorMessage
                            errors={props.errors}
                            name="password"
                            render={({ message }) => 
                                <div className={s.Form_input_fields_error}>
                                    <p>{message}</p>
                                </div>
                            }
                        />
                    </div>
                </div>
                <button className={s.Form_btn} type='submit' disabled={!props.isValid}>{BUTTON_ENTER_LABEL}</button>
            </form>
        </>
    );
};

export default AuthorizationFormMobile;