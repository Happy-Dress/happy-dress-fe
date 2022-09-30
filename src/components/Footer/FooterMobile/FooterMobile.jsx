import React from 'react';
import s from './FooterMobile.module.scss';
import { FOOTER_DICTIONARY } from '../Footer.dictionary';
import Typography from '../../Typography/Typography';

const FooterMobile = () => {
    const {
        FOOTER_MOBILE_SIGNATURE
    } = FOOTER_DICTIONARY;
    return (
        <div className={s.Footer_wrapper}>
            <div className={s.Footer_wrapper_side}>
                {FOOTER_MOBILE_SIGNATURE.map((items) => (
                    <p key={items}>
                        <Typography classNames={s.Footer_wrapper_side_items}>{items}
                        </Typography>
                    </p>))
                }
            </div>
        </div>
    );
};
export default FooterMobile;
