import React, { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import burger from '../../../../../assets/images/burger.svg';
import x from '../../../../../assets/images/x.svg';
import s from './NavigationPanelMobile.module.scss';
import './NavigationPanelMobileStyle.css';
import Typography from '../../../../../common/components/Typography/Typography';

const NavigationPanelMobile = () => {

    const [activeMenu, setActiveMenu] = useState(false);
    const [quanty, setQuanty] = useState(0);
   
    function api() {
        return Promise.resolve(5);
    }

    useEffect(() => {
        api().then((val) => setQuanty(val));
    }, []);

    return (
        <div className={s.adminMobileWrapper}>
            <div className={s.mobileHeader}>
                <div className={s.logoMobile}>
                    <Typography classNames={[s.logoMobileTitle]}>HAPPYDRESS</Typography>
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
                    <NavLink to="/admin/panel/catalog-setting">
                        <p>Каталог</p>
                    </NavLink>

                    <NavLink to="/admin/panel/goods-setting">
                        <p>Товар</p>
                    </NavLink>

                    <NavLink to="/admin/panel/registration-setting">
                        <p>Записи</p>
                        <span className={s.register}>{quanty}</span>
                    </NavLink>

                    <NavLink to="/admin/panel/blog-setting">
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