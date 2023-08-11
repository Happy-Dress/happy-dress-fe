import React, { useState } from 'react';
import s from './HeaderMobile.module.scss';
import { HEADER_DICTIONARY } from '../Header.dictionary';
import burger from '../../../../../common/assets/images/burger.svg';
import x from '../../../../../common/assets/images/x.svg';
import hanger from '../../../../../common/assets/images/hanger.svg';
import { Typography } from '../../../../../common/ui/components';
import { routerConfig } from '../../../config';
import { NavLink } from 'react-router-dom';

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
                <Typography classNames={[s.Header_logo]}>{HEADER_LOGO}</Typography>
                <div className={s.Header_right}>
                    {activeMenu ? (
                        <img
                            onClick={() => setActiveMenu(!activeMenu)}
                            className={s.Header_right_icon}
                            alt="menu"
                            src={x}
                        />
                    ) : (
                        <img
                            onClick={() => setActiveMenu(!activeMenu)}
                            className={s.Header_right_icon}
                            alt="menu"
                            src={burger}
                        />
                    )}
                    <img
                        onClick={() => setActiveMenu(!activeMenu)}
                        className={s.Header_right_icon}
                        alt="hanger"
                        src={hanger}
                    />
                </div>
            </div>
            {activeMenu && <div className={s.Menu}>
                <ul className={s.Menu_nav}>
                    {Object.values(routerConfig).map(({ path, name })=>(
                        <NavLink
                            key={name}
                            className={checkIsLinkActive}
                            to={path}
                            onClick={() => setActiveMenu(!activeMenu)}
                        >
                            <Typography classNames={[s.Menu_nav_item]}>
                                {name}
                            </Typography>
                        </NavLink>))
                    }
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
