import React, { useState } from 'react';
import s from './Header.module.scss';
import hanger from '../../images/hanger.svg';
import burger from '../../images/burger.svg';
import x from '../../images/x.svg';

const Header = () => {
    const [activeMenu, setActiveMenu] = useState(false);
    return (
        <>
            <div className={s.Header}>
                <div className={s.Header_left}>
                    <p className={s.Header_logo}>HAPPYDRESS</p>
                    <ul className={s.Header_menu}>
                        <li className={s.Header_menu__item}>Главная</li>
                        <li className={s.Header_menu__item}>Каталог</li>
                        <li className={s.Header_menu__item}>Блог</li>
                        <li className={s.Header_menu__item}>Контакты</li>
                        <li className={s.Header_menu__item}>Примерка</li>
                    </ul>
                </div>
                <div className={s.Header_right}>
                    <p className={s.Header_number}>+375 (29) 537 54 78</p>
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
                        <li className={s.Header_mobile_menu__item}>Главная</li>
                        <li className={s.Header_mobile_menu__item}>Каталог</li>
                        <li className={s.Header_mobile_menu__item}>Блог</li>
                        <li className={s.Header_mobile_menu__item}>Контакты</li>
                        <li className={s.Header_mobile_menu__item}>Примерка</li>
                        <li className={s.Header_mobile_menu__item}>
                            +375 (29) 537 54 78
                        </li>
                    </ul>
                </div>
            ) : null}
        </>
    );
};

export default Header;
