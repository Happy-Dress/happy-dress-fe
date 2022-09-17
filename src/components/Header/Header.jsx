import React, { useState } from 'react';
import s from './Header.module.scss';
import hanger from '../../images/hanger.svg';
import burger from '../../images/burger.svg';
import x from '../../images/x.svg';
import { HEADER_DICTIONARY } from './Header.dictionary';

const{
    HEADER_TITLE,
    HEADER_NAV_ITEMS,
    HEAD_NUMBER
}=HEADER_DICTIONARY;
const Header = () => {
    const [activeMenu, setActiveMenu] = useState(false);
    return (
        <>
            <div className={s.Header}>
                <div className={s.Header_left}>
                    <p className={s.Header_logo}>{HEADER_TITLE}</p>
                    <ul className={s.Header_menu}>
                        {HEADER_NAV_ITEMS.map((item)=>(<li key={item} className={s.Header_menu__item}><span>{item}</span></li>))}
                    </ul>
                </div>
                <div className={s.Header_right}>
                    <p className={s.Header_number}>{HEAD_NUMBER}</p>
                    <div className={s.Header_cart}>
                        <img alt="hanger" src={hanger} />
                        <p>0</p>
                    </div>
                </div>
                <div className={s.Header_mobile}>
                    <div className={s.Header_cart}>
                        <img alt="hanger" src={hanger} />
                        <p>0</p>
                    </div>
                    {activeMenu ? (
                        <img
                            onClick={() => setActiveMenu(!activeMenu)}
                            className={s.Header_mobile__burger}
                            alt="menu"
                            src={x}
                        />
                    ) : (
                        <img
                            onClick={() => setActiveMenu(!activeMenu)}
                            className={s.Header_mobile__burger}
                            alt="menu"
                            src={burger}
                        />
                    )}
                </div>
            </div>
            {activeMenu ? (
                <div className={s.Header_mobile_modal}>
                    <ul className={s.Header_mobile_menu}>
                        {HEADER_NAV_ITEMS.map((item)=>(<li key={item} className={s.Header_menu__item}><span>{item}</span></li>))}
                        <li className={s.Header_mobile_menu__number}>
                            {HEAD_NUMBER}
                        </li>
                    </ul>
                </div>
            ) : null}
        </>
    );
};

export default Header;
