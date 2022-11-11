import React, { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import burger from '../../../assets/images/burger.svg';
import x from '../../../assets/images/x.svg';
import HAPPYDRESS from '../../../assets/images/HAPPYDRESS.svg';
import s from './NavigationPanelMobile.module.scss';
import './NavigationPanelMobileStyle.css';


const NavigationPanelMobile = () => {

    const [activeMenu, setActiveMenu] = useState(false);
    const [quanty, setQuanty] = useState(0);
    const setActive = ({ isActive }) => (isActive ? 'active' : '');

    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/users/')
            .then((response) => response.json())
            .then((json) =>
                json.forEach((element) =>
                    setQuanty((prevQuanty) => prevQuanty + element.id)
                )
            )
            .catch((err) => console.error('something wrong happened', err));
    }, []);

    return (
        <div className={s.adminMobileWrapper}>
            <div className={s.mobileHeader}>
                <div className={s.logoMobile}>
                    <img src={HAPPYDRESS} alt="HAPPYDRESS" />
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
            {activeMenu && <div className={s.linkMobileWrapper}>
                <NavLink to="/admin/panel/catalog-setting" className={setActive}>
                    <p>Каталог</p>
                </NavLink>

                <NavLink to="/admin/panel/goods-setting" className={setActive}>
                    <p>Товар</p>
                </NavLink>

                <NavLink to="/admin/panel/registration-setting" className={setActive}>
                    <p>Записи</p>
                    <p className={s.register}>{quanty}</p>
                </NavLink>

                <NavLink to="/admin/panel/blog-setting" className={setActive}>
                    <p>Блог</p>
                </NavLink>

                <Link to="/domain/home" className={s.exit}>
                    <p>Выход</p>
                </Link>
            </div>}
        </div>
    );
};

export default NavigationPanelMobile;