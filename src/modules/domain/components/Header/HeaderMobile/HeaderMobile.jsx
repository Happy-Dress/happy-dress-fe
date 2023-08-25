import React, { useState } from 'react';
import s from './HeaderMobile.module.scss';
import { HEADER_DICTIONARY } from '../Header.dictionary';
import { ReactComponent as X } from '../../../../../common/assets/images/x.svg';
import { ReactComponent as Hanger } from '../../../../../common/assets/images/hanger.svg';
import { ReactComponent as Burger } from '../../../../../common/assets/images/burger.svg';
import { Typography } from '../../../../../common/ui/components';
import { routerConfig } from '../../../config';
import { NavLink } from 'react-router-dom';
import { disabledRouterConfig } from '../../../config/routerConfig/routerConfig';

const HeaderMobile = () => {
    const {
        HEADER_LOGO,
        PHONE_NUMBER,
    } = HEADER_DICTIONARY;
    const checkIsLinkActive = ({ isActive }) => (isActive ? s.active : '');
    const [activeMenu, setActiveMenu] = useState(false);
    return (
        <div className={activeMenu ? s.Header_wrapper_fixed : ''}>
            <div className={s.Header}>
                <NavLink to={routerConfig.home.path}>
                    <Typography classNames={[s.Header_logo]}>{HEADER_LOGO}</Typography>
                </NavLink>
                <div className={s.Header_right}>
                    {activeMenu ? (
                        <div
                            onClick={() => setActiveMenu(!activeMenu)}
                            className={s.Header_right_icon}
                        >
                            <X/>
                        </div>
                    ) : (
                        <div
                            onClick={() => setActiveMenu(!activeMenu)}
                            className={s.Header_right_icon}
                        >
                            <Burger/>
                        </div>
                    )}
                    <div className={s.Header_right_icon}>
                        <Hanger/>
                    </div>
                </div>
            </div>
            {activeMenu && <div className={s.Menu}>
                <ul className={s.Menu_nav}>
                    {Object.values(routerConfig).map(({ path, name }) => (
                        <NavLink
                            key={name}
                            className={checkIsLinkActive}
                            to={path}
                            onClick={() => {
                                setActiveMenu(!activeMenu);
                                window.scrollTo({ top: 0 });
                            }}
                        >
                            <Typography classNames={[s.Menu_nav_item]}>
                                {name}
                            </Typography>
                        </NavLink>
                    ))}
                    {Object.values(disabledRouterConfig).map(({ name, status }) => (
                        <NavLink
                            key={name}
                            className={s.Menu_nav_item_disabled}
                            to={'#'}
                            onClick={() => setActiveMenu(!activeMenu)}
                        >
                            <Typography classNames={[s.Menu_nav_item]}>
                                {name}
                            </Typography>
                            <Typography classNames={[s.Menu_nav_item_disabled_status]}>
                                {status}
                            </Typography>
                        </NavLink>
                    ))}
                </ul>
                <Typography classNames={[s.Menu_nav_number]}>
                    <a href={`tel:${PHONE_NUMBER}`}>{PHONE_NUMBER}</a>
                </Typography>

            </div>
            }
        </div>
    );
};
export default HeaderMobile;
