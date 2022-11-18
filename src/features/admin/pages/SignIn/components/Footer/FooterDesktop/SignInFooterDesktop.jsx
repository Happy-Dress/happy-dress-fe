import React from 'react';
import { SIGN_IN_FOOTER_DICTIONARY } from '../SignInFooter.dictionary';
import s from './SignInFooterDesktop.module.scss';

const {
    FOOTER_LOGO,
} = SIGN_IN_FOOTER_DICTIONARY;

const SignInFooterDesktop = () => {
    return (
        <div className={s.FooterDesktop}>
            <div>
                <h2 className={s.FooterDesktop_logo}>{FOOTER_LOGO}</h2>
            </div>
        </div>
    );
};

export default SignInFooterDesktop;