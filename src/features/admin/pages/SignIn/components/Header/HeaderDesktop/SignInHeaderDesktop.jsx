import React from 'react';
import { SIGN_IN_HEADER_DICTIONARY } from '../SignInHeader.dictionary';
import s from './SignInHeaderDesktop.module.scss';

const {
    HEADER_LOGO,
} = SIGN_IN_HEADER_DICTIONARY;

const SignInHeaderDesktop = () => {
    return(
        <div className={s.Header}>
            <div>
                <span className={s.Header_logo}>{HEADER_LOGO}</span>
            </div>
        </div>
    );
};

export default SignInHeaderDesktop;