import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { ReactComponent as Exit } from '../../../../../common/assets/images/exit.svg';
import { ReactComponent as Catalog } from '../../../../../common/assets/images/catalog.svg';
import { ReactComponent as Goods } from '../../../../../common/assets/images/goods.svg';
import { ReactComponent as Registration } from '../../../../../common/assets/images/registration.svg';
import { ReactComponent as Blog } from '../../../../../common/assets/images/blog.svg';
import s from './NavigationPanelDesktop.module.scss';
import Typography from '../../../../../common/ui/components/Typography/Typography';
import { NAVIGATION_PANEL_DICTIONARY } from '../NavigationPanel.dictionary';
import { ADMIN_PANEL_ROUTES } from '../../../adminRoutes';
import PropTypes from 'prop-types';
import { useToasters } from '../../../../../common/ui/contexts/ToastersContext';

const {
    ADMIN_LOGO,
    ADMIN_NAV_ITEMS,
    EXIT,
    SUCCESS_EXIT,
} = NAVIGATION_PANEL_DICTIONARY;

const NavigationPanelDesktop = ({ ordersAmount }) => {
    const { showToasterSuccess } = useToasters();

    const { ROUTES, SIGN_IN } = ADMIN_PANEL_ROUTES;
    const checkIsLinkActive = ({ isActive }) => (isActive ? s.active : '');
    const imagesMap = new Map([
        ['Каталог', <Catalog key={0} className={s.img} />],
        ['Товар', <Goods key={1} className={s.img} />],
        ['Записи', <Registration key={2} className={s.img} />],
        ['Блог', <Blog key={3} className={s.img} />],
    ]);
    return (
        <div className={s.navbar}>
            <div className={s.logo}>
                <Typography classNames={[s.logoTitle]}>{ADMIN_LOGO}</Typography>
            </div>
            <div className={s.navbarList}>
                {ADMIN_NAV_ITEMS.map((item, index) => (
                    <NavLink
                        key={index}
                        to={ROUTES[index]}
                        className={checkIsLinkActive}
                    >
                        {imagesMap.get(item)}
                        <p>{item}</p>
                        {item === 'Записи' && (
                            <span className={s.register}>{ordersAmount}</span>
                        )}
                    </NavLink>
                ))}
                <Link to={SIGN_IN}>
                    <Exit />
                    <p>{EXIT}</p>
                    {showToasterSuccess(SUCCESS_EXIT)}
                </Link>
            </div>
        </div>
    );
};

NavigationPanelDesktop.propTypes = {
    ordersAmount: PropTypes.number,
};
export default NavigationPanelDesktop;
