import React, { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import burger from '../../../../../assets/images/burger.svg';
import x from '../../../../../assets/images/x.svg';
import s from './NavigationPanelMobile.module.scss';
import './NavigationPanelMobile.css';
import getOrdersAmount from '../../../getOrdersAmount/getOrdersAmount';
import Typography from '../../../../../common/components/Typography/Typography';
import { NAVIGATION_PANEL_DICTIONARY } from '../NavigationPanel.dictionary';
import { ADMIN_PANEL_ROUTES } from '../../../adminRoutes';
import PropTypes from 'prop-types';
const NavigationPanelMobile = (props) => {
    const {
        CATALOG_SETTINGS,
        GOODS_SETTINGS,
        SIGN_IN,
        BLOG_SETTINGS,
        REGISTRATION_SETTINGS,
    } = ADMIN_PANEL_ROUTES;
    const { ADMIN_LOGO } = NAVIGATION_PANEL_DICTIONARY;
    const [activeMenu, setActiveMenu] = useState(false);
    const [quanty, setQuanty] = useState(0);
 

    useEffect(() => {
        getOrdersAmount().then((val) => setQuanty(val));
    }, []);

    return (
        <div className={s.adminMobileWrapper}>
            <div className={s.mobileHeader}>
                <div className={s.logoMobile}>
                    <Typography classNames={[s.logoTitle]}>{ADMIN_LOGO}</Typography>
                </div>
                <div className={s.buttonBurgerMobile}>
                    {activeMenu ? (
                        <img
                            src={x}
                            alt="X"
                            onClick={() => {
                                setActiveMenu(!activeMenu);
                            }}
                        />
                    ) : (
                        <img
                            src={burger}
                            alt="_"
                            onClick={() => {
                                setActiveMenu(!activeMenu);
                            }}
                        />
                    )}
                </div>
            </div>
            {activeMenu && (
                <div className={s.linkMobileWrapper}>
                    <NavLink to={CATALOG_SETTINGS} className={props.setActive}>
                        <p>Каталог</p>
                    </NavLink>

                    <NavLink to={GOODS_SETTINGS} className={props.setActive}>
                        <p>Товар</p>
                    </NavLink>

                    <NavLink to={REGISTRATION_SETTINGS} className={props.setActive}>
                        <p>Записи</p>
                        <span className={s.register}>{quanty}</span>
                    </NavLink>

                    <NavLink to={BLOG_SETTINGS} className={props.setActive}>
                        <p>Блог</p>
                    </NavLink>

                    <Link to={SIGN_IN} className={s.exit}>
                        <p>Выход</p>
                    </Link>
                </div>
            )}
        </div>
    );
};
NavigationPanelMobile.propTypes = {
    setActive: PropTypes.func,
};
export default NavigationPanelMobile;
