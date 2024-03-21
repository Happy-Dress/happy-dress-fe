import React from 'react';
import s from './HeaderDesktop.module.scss';
import { ReactComponent as Hanger } from '../../../../../common/assets/images/hanger.svg';
import { HEADER_DICTIONARY } from '../Header.dictionary';
import { Typography } from '../../../../../common/ui/components';
import { NavLink } from 'react-router-dom';
import { routerConfig } from '../../../config';
import { disabledRouterConfig } from '../../../config/routerConfig/routerConfig';
import PropTypes from 'prop-types';


const {
    HEADER_LOGO,
    PHONE_NUMBER
} = HEADER_DICTIONARY;

const HeaderDesktop = ({ ordersAmount }) => {
    return (
        <div className={s.Header}>
            <div className={s.Header_logo_wrapper}>
                <NavLink to={routerConfig.home.path} className={s.Header_logo_wrapper_logo}>
                    <span>{HEADER_LOGO}</span>
                </NavLink>
            </div>
            <ul className={s.Header_menu}>
                {Object.values(routerConfig).map(({ path, name }) => (
                    <NavLink
                        key={name}
                        className={({ isActive }) => isActive ? s.active : ''}
                        to={path}
                    >
                        <Typography classNames={[s.Header_menu_item]}>
                            {name}
                        </Typography>
                    </NavLink>
                ))}
                {Object.values(disabledRouterConfig).map(({ name, status }) => (
                    <NavLink
                        key={name}
                        className={s.Header_menu_item_disabled}
                        to={'#'}
                    >
                        <Typography classNames={[s.Header_menu_item]}>
                            {name}
                        </Typography>
                        <Typography classNames={[s.Header_menu_item_disabled_status]}>{status}</Typography>
                    </NavLink>
                ))}
            </ul>
            <div className={s.Header_right_side}>
                <div className={s.Header_right_side_hanger}>
                    <NavLink to='order' className={({ isActive }) => isActive ? s.Header_right_side_hanger_active : ''}>
                        <Hanger/>
                        <span className={s.Header_right_side_hanger_amount}>{ordersAmount}</span>
                    </NavLink>
                </div>
                <div className={s.Header_right_side_delimiter}/>
                <Typography>
                    <a
                        className={s.Header_right_side_number}
                        href={`tel:${PHONE_NUMBER}`}
                    >
                        {PHONE_NUMBER}
                    </a>
                </Typography>
            </div>
        </div>
    );
};

HeaderDesktop.propTypes = {
    ordersAmount: PropTypes.number.isRequired,
};

export default HeaderDesktop;
