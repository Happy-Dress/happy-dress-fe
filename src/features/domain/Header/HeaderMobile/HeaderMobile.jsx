import React, { useState } from 'react';
import s from './HeaderMobile.module.scss';
import { HEADER_DICTIONARY } from '../Header.dictionary';
import burger from '../../../../images/burger.svg';
import x from '../../../../images/x.svg';
import hanger from '../../../../images/hanger.svg';
import Typography from '../../../../components/Typography/Typography';
import classNames from 'classnames';

const HeaderMobile = () => {
    const {
        HEADER_LOGO,
        HEADER_MOBILE_NAV_ITEMS,
        PHONE_NUMBER,
    } = HEADER_DICTIONARY;
    const [activeMenu, setActiveMenu] = useState(false);
    return (
        <div className={classNames(s.Header_wrapper, activeMenu? s.Header_wrapper_fixed : '')}>
            <div className={s.Header}>
                <Typography classNames={[s.Header_logo]}>{HEADER_LOGO}</Typography>
                <div className={s.Header_right}>
                    {activeMenu ? (
                        <img
                            onClick={() => setActiveMenu(!activeMenu)}
                            className={s.Header_right_icon}
                            alt='menu'
                            src={x}
                        />
                    ) : (
                        <img
                            onClick={() => setActiveMenu(!activeMenu)}
                            className={s.Header_right_icon}
                            alt='menu'
                            src={burger}
                        />
                    )}
                    <img
                        onClick={() => setActiveMenu(!activeMenu)}
                        className={s.Header_right_icon}
                        alt='hanger'
                        src={hanger}
                    />
                </div>
            </div>
            {activeMenu && <div className={s.Menu}>
                <ul className={s.Menu_nav}>
                    {HEADER_MOBILE_NAV_ITEMS.map((item) => (
                        <li key={item}>
                            <Typography classNames={[s.Menu_nav_item]}>{item}
                            </Typography>
                        </li>))
                    }
                </ul>
                <Typography classNames={[s.Menu_nav_number]}>{PHONE_NUMBER}</Typography>

            </div>
            }
        </div>
    );
};
export default HeaderMobile;
