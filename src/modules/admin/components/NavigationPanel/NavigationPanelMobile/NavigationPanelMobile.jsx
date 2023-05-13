import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import burger from '../../../../../common/assets/images/burger.svg';
import x from '../../../../../common/assets/images/x.svg';
import s from './NavigationPanelMobile.module.scss';
import Typography from '../../../../../common/ui/components/Typography/Typography';
import { NAVIGATION_PANEL_DICTIONARY } from '../NavigationPanel.dictionary';
import { ADMIN_PANEL_ROUTES } from '../../../adminRoutes';
import PropTypes from 'prop-types';

const NavigationPanelMobile = ({ ordersAmount, handleExit }) => {
    const { ROUTES } = ADMIN_PANEL_ROUTES;
    const checkIsLinkActive = ({ isActive }) => (isActive ? s.active : '');
    const { ADMIN_LOGO, ADMIN_NAV_ITEMS, EXIT } =
    NAVIGATION_PANEL_DICTIONARY;
    const [activeMenu, setActiveMenu] = useState(false);

    const handleMenuToggle = () => {
        setActiveMenu(!activeMenu);
        document.body.style.overflow = activeMenu ? 'auto' : 'hidden';
    };

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
                            onClick={handleMenuToggle}
                        />
                    ) : (
                        <img
                            src={burger}
                            alt="W"
                            onClick={handleMenuToggle}
                        />
                    )}
                </div>
            </div>
            {activeMenu && (
                <div className={s.mobileMenu}>
                    <div className={s.linkMobileWrapper}>
                        {ADMIN_NAV_ITEMS.map((item, index) => (
                            <NavLink
                                key={Math.random() * index}
                                to={ROUTES[index]}
                                className={checkIsLinkActive}
                            >
                                <p>{item}</p>
                                {item === 'Записи' && (
                                    <span className={s.register}>{ordersAmount}</span>
                                )}
                            </NavLink>
                        ))}
                    </div>
                    <Link onClick={handleExit} className={s.exit}>
                        <p>{EXIT}</p>
                    </Link>
                </div>
            )}
        </div>
    );
};
NavigationPanelMobile.propTypes = {
    ordersAmount: PropTypes.number.isRequired,
    handleExit: PropTypes.func.isRequired,
};
export default NavigationPanelMobile;
