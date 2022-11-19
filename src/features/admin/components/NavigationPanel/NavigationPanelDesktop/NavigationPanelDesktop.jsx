import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { ReactComponent as Exit } from '../../../../../assets/images/exit.svg';
import { ReactComponent as Catalog } from '../../../../../assets/images/catalog.svg';
import { ReactComponent as Goods } from '../../../../../assets/images/goods.svg';
import { ReactComponent as Registration } from '../../../../../assets/images/registration.svg';
import { ReactComponent as Blog } from '../../../../../assets/images/blog.svg';
import s from './NavigationPanelDesktop.module.scss';
import './NavigationPanelDesktop.css';
import Typography from '../../../../../common/components/Typography/Typography';
import { NAVIGATION_PANEL_DICTIONARY } from '../NavigationPanel.dictionary';
import { ADMIN_PANEL_ROUTES } from '../../../adminRoutes';
import PropTypes from 'prop-types';

const NavigationPanelDesktop = ({ ordersAmount }) => {
    const { ADMIN_LOGO, ADMIN_NAV_ITEMS, EXIT } = NAVIGATION_PANEL_DICTIONARY;
    const { ROUTES, SIGN_IN } = ADMIN_PANEL_ROUTES;
    const setActive = ({ isActive }) => (isActive ? 'active' : '');
    return (
        <div className={s.navbar}>
            <div className={s.logo}>
                <Typography classNames={[s.logoTitle]}>{ADMIN_LOGO}</Typography>
            </div>
            <div className={s.navbarList}>
                {ADMIN_NAV_ITEMS.map((item, index) => (
                    <NavLink key={index} to={ROUTES[index]} className={setActive}>
                        <p>{item}</p>
                        {item === 'Записи' && (
                            <span className={s.register}>{ordersAmount}</span>
                        )}
                    </NavLink>
                ))}
                <Link to={SIGN_IN}>
                    <Exit />
                    <p>{EXIT}</p>
                </Link>
            </div>
        </div>
    );
};

NavigationPanelDesktop.propTypes = {
    ordersAmount: PropTypes.number,
};
export default NavigationPanelDesktop;
