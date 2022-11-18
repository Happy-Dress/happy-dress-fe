import React, { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { ReactComponent as Exit } from '../../../../../assets/images/exit.svg';
import { ReactComponent as Catalog } from '../../../../../assets/images/catalog.svg';
import { ReactComponent as Goods } from '../../../../../assets/images/goods.svg';
import { ReactComponent as Registration } from '../../../../../assets/images/registration.svg';
import { ReactComponent as Blog } from '../../../../../assets/images/blog.svg';
import s from './NavigationPanelDesktop.module.scss';
import './NavigationPanelDesktop.css';
import getOrdersAmount from '../../../getOrdersAmount/getOrdersAmount';
import Typography from '../../../../../common/components/Typography/Typography';
import { NAVIGATION_PANEL_DICTIONARY } from '../NavigationPanel.dictionary';
import { ADMIN_PANEL_ROUTES } from '../../../adminRoutes';
import PropTypes from 'prop-types';
const NavigationPanelDesktop = (props) => {
    const { ADMIN_LOGO } = NAVIGATION_PANEL_DICTIONARY;
    const {
        CATALOG_SETTINGS,
        GOODS_SETTINGS,
        SIGN_IN,
        BLOG_SETTINGS,
        REGISTRATION_SETTINGS,
    } = ADMIN_PANEL_ROUTES;
    const [quanty, setQuanty] = useState(0);

    useEffect(() => {
        getOrdersAmount().then((val) => setQuanty(val));
    }, []);

    return (
        <div className={s.navbar}>
            <div className={s.logo}>
                <Typography classNames={[s.logoTitle]}>{ADMIN_LOGO}</Typography>
            </div>
            <div className={s.navbarList}>
                <NavLink to={CATALOG_SETTINGS} className={props.setActive}>
                    <Catalog className="img" />
                    <p>Каталог</p>
                </NavLink>

                <NavLink to={GOODS_SETTINGS} className={props.setActive}>
                    <Goods className="img" />
                    <p>Товар</p>
                </NavLink>

                <NavLink to={REGISTRATION_SETTINGS} className={props.setActive}>
                    <Registration className="img" />
                    <p>Записи</p>
                    <span className={s.register}>{quanty}</span>
                </NavLink>

                <NavLink to={BLOG_SETTINGS} className={props.setActive}>
                    <Blog className="img" />
                    <p>Блог</p>
                </NavLink>

                <Link to={SIGN_IN}>
                    <Exit />
                    <p>Выход</p>
                </Link>
            </div>
        </div>
    );
};

NavigationPanelDesktop.propTypes = {
    setActive: PropTypes.func,
};
export default NavigationPanelDesktop;
