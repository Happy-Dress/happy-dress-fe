import React from 'react';
import s from './AuthorizationFormDesktop.module.scss';
import { AUTHORIZATION_FORM_DICTIONARY } from '../AuthorizationForm.dictionary';
import person from '../../../../../../../assets/images/person.svg';
import arrowRight from '../../../../../../../assets/images/arrowRight.svg';
import { ErrorMessage } from '@hookform/error-message';
import classNames from 'classnames';
import PropTypes from 'prop-types';

const {
    ENTRY_LABEL,
    HELP_YOUR_NAME_LABEL,
    HELP_PASSWORD_LABEL,
    BUTTON_ENTER_LABEL,
    MAX_LOGIN_LENGTH,
    MAX_PASSWORD_LENGTH,
} = AUTHORIZATION_FORM_DICTIONARY;

const AuthorizationFormDesktop = (props) => {
    return (
        <div className={s.Container}>
            <form className={s.Form} onSubmit={props.handleSubmit(props.onSubmit)}>
                <div className={s.Form_entry_label}>
                    <h2>{ENTRY_LABEL}</h2>
                </div>
                <div className={s.Form_input_fields}>
                    <div>
                        <div
                            className={classNames(s.Form_input_fields_input, props.errors.login?.message ? 
                                s.Form_input_fields_input_invalid : s.Form_input_fields_input_valid)}>
                            <img className={s.Form_input_fields_img_input} src={person} alt="person"/>
                            <input type="text" placeholder={HELP_YOUR_NAME_LABEL}
                                maxLength={MAX_LOGIN_LENGTH} {...props.register('login')}/>
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
                        <div>
                            <div
                                className={classNames(s.Form_input_fields_input, s.Form_input_fields_input_password, props.errors.password?.message ? s.Form_input_fields_input_invalid : s.Form_input_fields_input_valid)}>
                                <img className={s.Form_input_fields_img_input} src={arrowRight} alt="arrowRight"/>
                                <input type={props.type} placeholder={HELP_PASSWORD_LABEL}
                                    maxLength={MAX_PASSWORD_LENGTH} {...props.register('password')}/>
                                <img src={props.toggleIcon} onClick={props.changeVisibility} alt="visibility icon"/><br/>
                            </div>
                            <ErrorMessage
                                errors={props.errors}
                                name="password"
                                render={({ message }) => <div className={s.Form_input_fields_error}>
                                    <p>{message}</p>
                                </div>
                                }
                            />
                        </div>
                    </div>
                </div>
                <button className={s.Form_btn} type="submit" disabled={!props.isValid}>{BUTTON_ENTER_LABEL}</button>
            </form>
        </div>
    );
};


AuthorizationFormDesktop.propTypes ={
    onSubmit: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    errors: PropTypes.object.isRequired,
    register: PropTypes.func.isRequired,
    changeVisibility: PropTypes.func.isRequired,
    type: PropTypes.string.isRequired,
    isValid: PropTypes.bool.isRequired,
    toggleIcon: PropTypes.string.isRequired,
};

export default AuthorizationFormDesktop;