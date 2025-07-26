import React from 'react';
import s from './FooterDesktop.module.scss';
import Instagram from '../../../../../common/assets/images/inst.svg';
import Vk from '../../../../../common/assets/images/vk.svg';
import Telgram from '../../../../../common/assets/images/tg.svg';
import { FOOTER_DICTIONARY } from '../Footer.dictionary';
import { Typography } from '../../../../../common/ui/components';
import { routerConfig } from '../../../config';
import { NavLink } from 'react-router-dom';
import { disabledRouterConfig } from '../../../config/routerConfig/routerConfig';

const {
    FOOTER_LOGO,
    PHONE_NUMBER,
    FOOTER_EMAIL,
    FOOTER_SIGNATURE,
    INSTAGRAM_LINK,
    VK_LINK,
    TELEGRAM_LINK,
} = FOOTER_DICTIONARY;

const FooterDesktop = () => {
    return (
        <div className={s.FooterDesktop}>
            <div className={s.Footer}>
                <div className={s.Footer_title}>
                    <NavLink to={routerConfig.home.path} className={s.Footer_logo}>
                        <span >{FOOTER_LOGO}</span>
                    </NavLink>
                </div>
                <ul className={s.Footer_menu}>
                    {Object.values(routerConfig).map(({ path, name })=>(
                        <NavLink
                            key={name}
                            to={path}
                            className={({ isActive }) => isActive ? s.Footer_menu_item_active : ''}
                            onClick={() => window.scrollTo({ top: 0 })}
                        >
                            <Typography classNames={[s.Footer_menu_item]}>
                                {name}
                            </Typography>
                        </NavLink>
                    ))}
                    {Object.values(disabledRouterConfig).map(({ name, status })=>(
                        <NavLink
                            key={name}
                            to={'#'}
                            className={s.Footer_menu_item_disabled}>
                            <Typography classNames={[s.Footer_menu_item]}>
                                {name}
                            </Typography>
                            <Typography classNames={[s.Footer_menu_item_disabled_status]}>
                                {status}
                            </Typography>
                        </NavLink>
                    ))}
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
                        <a href={INSTAGRAM_LINK} target="_blank" rel="noreferrer">
                            <Instagram className={s.Footer_right_side_hanger} alt="instagram"/>
                        </a>
                        <a href={VK_LINK} target="_blank" rel="noreferrer">
                            <Vk className={s.Footer_right_side_hanger} alt="vk"/>
                        </a>
                        <a href={TELEGRAM_LINK} target="_blank" rel="noreferrer">
                            <Telgram className={s.Footer_right_side_hanger} alt="telegram"/>
                        </a>
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
