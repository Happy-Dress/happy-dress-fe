import React, { useState } from 'react';
import s from './AuthorizationForm.module.scss';
import { AUTHORIZATION_FORM_DICTIONARY } from './AuthorizationForm.dictionary';
import person from '../../../../../../assets/images/person.svg';
import arrowRight from '../../../../../../assets/images/arrowRight.svg';
import openEye from '../../../../../../assets/images/openEye.svg';
import closedEye from '../../../../../../assets/images/closedEye.svg';

const {
    ENTRY_LABEL,
    HELP_YOUR_NAME_LABEL,
    HELP_PASSWORD_LABEL,
    BUTTON_ENTER_LABEL,
    MAX_LENGTH_INPUT,
} = AUTHORIZATION_FORM_DICTIONARY;

const AuthorizationForm = () => {
    const [toggleIcon, setToggleIcon] = useState(closedEye);
    const [type, setType] = useState('password');

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
        <form className={s.Form}>
            <div>
                <div className={s.Form_entry_label}>
                    <h2>{ENTRY_LABEL}</h2>
                </div>
                <div className={`${s.Form_input} ${s.Form_input_login}`}>
                    <img className={s.Form_img_input} src={person} alt="person"/>
                    <input type="text" placeholder={HELP_YOUR_NAME_LABEL} maxLength={MAX_LENGTH_INPUT}/>
                </div>
                <div className={`${s.Form_input} ${s.Form_input_password}`}>
                    <img className={s.Form_img_input} src={arrowRight} alt="arrowRight"/>
                    <input type={type} placeholder={HELP_PASSWORD_LABEL} maxLength={MAX_LENGTH_INPUT}/>
                    <img src={toggleIcon} onClick={changeVisibility} alt="visibility icon"/>
                </div>
                <button className={s.Form_btn} type="submit">{BUTTON_ENTER_LABEL}</button>
            </div>
        </form>
    );
};

export default AuthorizationForm;