import React from 'react';
import s from './FooterDesktop.module.scss';
import instagram from '../../../../../assets/images/inst.svg';
import vk from '../../../../../assets/images/vk.svg';
import telegram from '../../../../../assets/images/tg.svg';
import { FOOTER_DICTIONARY } from '../Footer.dictionary';
import Typography from '../../../../../common/components/Typography/Typography';

const {
    FOOTER_LOGO,
    FOOTER_MOBILE_NAV_ITEMS,
    PHONE_NUMBER,
    FOOTER_EMAIL,
    FOOTER_SIGNATURE,
} = FOOTER_DICTIONARY;

const FooterDesktop = () => {
    return (
        <div className={s.FooterDesktop}>
            <div className={s.Footer}>
                <div className={s.Footer_title}>
                    <span className={s.Footer_logo}>{FOOTER_LOGO}</span>
                </div>
                <ul className={s.Footer_menu}>
                    {FOOTER_MOBILE_NAV_ITEMS.map((item) => (
                        <li key={item}>
                            <Typography classNames={[s.Footer_menu_item]}>{item}
                            </Typography>
                        </li>))
                    }
                </ul>
                <div className={s.Footer_right_side}>
                    <div className={s.Footer_right_side_text}>
                        <Typography classNames={[s.Footer_right_side_phone]}>
                            <a href={`tel:${PHONE_NUMBER}`}>{PHONE_NUMBER}</a>
                        </Typography>
                        <Typography classNames={[s.Footer_right_side_email]}>
                            <a href={`mailto:${FOOTER_EMAIL}`}>{FOOTER_EMAIL}</a>
                        </Typography>
                    </div>
                    <div className={s.Footer_right_side_menu}>
                        <img className={s.Footer_right_side_hanger} src={instagram} alt="instagram"/>
                        <img className={s.Footer_right_side_hanger} src={vk} alt="vk"/>
                        <img className={s.Footer_right_side_hanger} src={telegram} alt="telegram"/>
                    </div>
                </div>

            </div>
            <div className={s.Footer_down_side}>
                {FOOTER_SIGNATURE.map((items) => (
                    <p key={items}>
                        <Typography classNames={[s.Footer_down_side_items]}>{items}
                        </Typography>
                    </p>))
                }

            </div>
        </div>
    );
};

export default FooterDesktop;
