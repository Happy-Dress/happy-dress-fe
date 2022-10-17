import React from 'react';
import s from './FooterMobile.module.scss';
import instagram from '../../../images/inst.svg';
import vk from '../../../images/vk.svg';
import telegram from '../../../images/tg.svg';
import { FOOTER_DICTIONARY } from '../Footer.dictionary';
import Typography from '../../Typography/Typography';
const {
    FOOTER_LOGO,
    FOOTER_MOBILE_NAV_ITEMS,
    PHONE_NUMBER,
    FOOTER_EMAIL,
    FOOTER_MOBILE_SIGNATURE
} = FOOTER_DICTIONARY;
const FooterMobile = () => {
   
    return (
        <div className={s.FooterMobiles}>
            <div className={s.FooterMobile}>
                <div className={s.FooterMobile_title}>
                    <span className={s.FooterMobile_logo}>{FOOTER_LOGO}</span>
                </div>
                <ul className={s.FooterMobile_menu}>
                    {FOOTER_MOBILE_NAV_ITEMS.map((item) => (
                        <li key={item}>
                            <Typography classNames={[s.FooterMobile_menu_item]}>{item}
                            </Typography>
                        </li>))
                    }
                </ul>
                <div className={s.FooterMobile_right_side}>
                    <div className={s.FooterMobile_right_side_text}>
                        <Typography classNames={s.FooterMobile_right_side_phone}>{PHONE_NUMBER}</Typography>
                        <Typography classNames={s.FooterMobile_right_side_email}>{FOOTER_EMAIL}</Typography>
                    </div>
                    <div className={s.FooterMobile_right_side_menu}>
                        <img className={s.FooterMobile_right_side_hanger} src={instagram} alt="instagram" />
                        <img className={s.FooterMobile_right_side_hanger} src={vk} alt="vk" />
                        <img className={s.FooterMobile_right_side_hanger} src={telegram} alt="telegram" />
                    </div>
                </div>

            </div>
            <div className={s.FooterMobile_wrapper}>
                <div className={s.FooterMobile_wrapper_side}>
                    {FOOTER_MOBILE_SIGNATURE.map((items) => (
                        <p key={items}>
                            <Typography classNames={s.FooterMobile_wrapper_side_items}>{items}
                            </Typography>
                        </p>))
                    }
                </div>
            </div>
        </div>

    );
};
export default FooterMobile;
