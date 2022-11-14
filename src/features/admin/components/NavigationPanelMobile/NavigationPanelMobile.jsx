import React, { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import burger from '../../../../assets/images/burger.svg';
import x from '../../../../assets/images/x.svg';
import s from './NavigationPanelMobile.module.scss';
import  api  from '../../api/api';
import Typography from '../../../../common/components/Typography/Typography';


const NavigationPanelMobile = () => {
    const [activeMenu, setActiveMenu] = useState(false);
    const [quanty, setQuanty] = useState(0);
    const setActive = ({ isActive }) => (isActive ? 'active' : '');

    useEffect(() => {
        api().then((val) => setQuanty(val));
    }, []);

    return (
        <div className={s.adminMobileWrapper}>
            <div className={s.mobileHeader}>
                <div className={s.logoMobile}>
                    <Typography />
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
                    <NavLink to="/admin/panel/catalog-setting" className={setActive}>
                        <p>Каталог</p>
                    </NavLink>

                    <NavLink to="/admin/panel/goods-setting" className={setActive}>
                        <p>Товар</p>
                    </NavLink>

                    <NavLink
                        to="/admin/panel/registration-setting"
                        className={setActive}
                    >
                        <p>Записи</p>
                        <p className={s.register}>{quanty}</p>
                    </NavLink>

                    <NavLink to="/admin/panel/blog-setting" className={setActive}>
                        <p>Блог</p>
                    </NavLink>

                    <Link to="/domain/home" className={s.exit}>
                        <p>Выход</p>
                    </Link>
                </div>
            )}
        </div>
    );
};

export default NavigationPanelMobile;
