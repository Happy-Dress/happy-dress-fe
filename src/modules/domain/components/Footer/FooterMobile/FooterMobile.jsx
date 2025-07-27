import React from 'react';
import s from './FooterMobile.module.scss';
import Instagram from '../../../../../common/assets/images/inst.svg';
import Vk from '../../../../../common/assets/images/vk.svg';
import Telegram from '../../../../../common/assets/images/tg.svg';
import { FOOTER_DICTIONARY } from '../Footer.dictionary';
import { Typography } from '../../../../../common/ui/components';
import { routerConfig } from '../../../config';
import { NavLink } from 'react-router-dom';
import { disabledRouterConfig } from '../../../config/routerConfig/routerConfig';

const {
    FOOTER_LOGO,
    PHONE_NUMBER,
    FOOTER_EMAIL,
    DEVELOPERS_TEAM,
    FOOTER_MOBILE_SIGNATURE,
    INSTAGRAM_LINK,
    VK_LINK,
    TELEGRAM_LINK,
    GEOLOCATION,
} = FOOTER_DICTIONARY;

const FooterMobile = () => {

    return (
        <>
            <div className={s.FooterMobile}>
                <div className={s.FooterMobile_title}>
                    <span className={s.FooterMobile_logo}>{FOOTER_LOGO}</span>
                </div>
                <ul className={s.FooterMobile_menu}>
                    {Object.values(routerConfig).map(({ path, name }) => (
                        <NavLink 
                            key={name}
                            to={path}
                            className={({ isActive }) => isActive ? s.FooterMobile_menu_item_active : ''}
                            onClick={() => window.scrollTo({ top: 0 })}
                        >
                            <Typography classNames={[s.FooterMobile_menu_item]}>
                                {name}
                            </Typography>
                        </NavLink>
                    ))}
                    {Object.values(disabledRouterConfig).map(({ name, status }) => (
                        <NavLink
                            key={name}
                            to={'#'}
                            className={s.FooterMobile_menu_item_disabled}
                        >
                            <Typography classNames={[s.FooterMobile_menu_item]}>
                                {name}
                            </Typography>
                            <Typography classNames={[s.FooterMobile_menu_item_disabled_status]}>
                                {status}
                            </Typography>
                        </NavLink>
                    ))}
                </ul>
                <div className={s.FooterMobile_right_side}>
                    <div className={s.FooterMobile_right_side_text}>
                        <Typography classNames={[s.FooterMobile_right_side_phone]}>
                            <a href={`tel:${PHONE_NUMBER}`}>{PHONE_NUMBER}</a>
                        </Typography>
                        <Typography classNames={[s.FooterMobile_right_side_email]}>
                            <a href={`mailto:${FOOTER_EMAIL}`}>{FOOTER_EMAIL}</a>
                        </Typography>
                    </div>
                    <div className={s.FooterMobile_right_side_menu}>
                        <a href={INSTAGRAM_LINK} target="_blank" rel="noreferrer">
                            <Instagram className={s.FooterMobile_right_side_hanger} alt="instagram"/>
                        </a>
                        <a href={VK_LINK} target="_blank" rel="noreferrer">
                            <Vk className={s.FooterMobile_right_side_hanger} alt="vk"/>
                        </a>
                        <a href={TELEGRAM_LINK} target="_blank" rel="noreferrer">
                            <Telegram className={s.FooterMobile_right_side_hanger} alt="telegram"/>
                        </a>
                    </div>
                </div>

            </div>
            <div className={s.FooterMobile_wrapper}>
                <div>
                    {FOOTER_MOBILE_SIGNATURE.map((items) => (
                        <a href={`geo:${GEOLOCATION.toString()}`} key={items}>
                            <Typography>
                                {items}
                            </Typography>
                        </a>))
                    }
                </div>
                <div>
                    <Typography>
                        {DEVELOPERS_TEAM}
                    </Typography>
                </div>
            </div>
        </>
    );
};
export default FooterMobile;
