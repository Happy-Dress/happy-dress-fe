import React from 'react';
import { FOOTER_DICTIONARY } from '../Footer.dictionary';
import s from './FooterDesktop.module.scss';

const {
    FOOTER_LOGO,
} = FOOTER_DICTIONARY;

const FooterDesktop = () => {
    return (
        <div className={s.FooterDesktop}>
            <div>
                <h2 className={s.FooterDesktop_logo}>{FOOTER_LOGO}</h2>
            </div>
        </div>
    );
};

export default FooterDesktop;