import React from 'react';
import { HEADER_DICTIONARY } from '../Header.dictionary';
import s from './HeaderDesktop.module.scss';

const {
    HEADER_LOGO,
} = HEADER_DICTIONARY;

const HeaderDesktop = () => {
    return(
        <div className={s.Header}>
            <div>
                <span className={s.Header_logo}>{HEADER_LOGO}</span>
            </div>
        </div>
    );
};

export default HeaderDesktop;