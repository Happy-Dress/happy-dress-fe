import React, { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { ReactComponent as Exit } from '../../../../assets/images/exit.svg';
import { ReactComponent as Catalog } from '../../../../assets/images/catalog.svg';
import { ReactComponent as Goods } from '../../../../assets/images/goods.svg';
import { ReactComponent as Registration } from '../../../../assets/images/registration.svg';
import { ReactComponent as Blog } from '../../../../assets/images/blog.svg';
import s from './NavigationPanelDesktop.module.scss';
import  './NavigationPanelDesktop.css';
import api from '../../api/api';
import Typography from '../../../../common/components/Typography/Typography';

const NavigationPanelDesktop = () => {
    const [quanty, setQuanty] = useState(0);
    const setActive = ({ isActive }) => (isActive ? 'active' : '');
    
    useEffect(() => {

        api().then((val) =>setQuanty(val));
  
    }, []);

    return (
        <div className={s.navbar}>
            <div className={s.logo}>
                <Typography classNames={[s.logoTitle]}>HAPPYDRESS</Typography>
            </div>
            <div className={s.navbarList}>
                <NavLink to="/admin/panel/catalog-setting" className={setActive}>
                    <Catalog className="img" />
                    <p>Каталог</p>
                </NavLink>

                <NavLink to="/admin/panel/goods-setting" className={setActive}>
                    <Goods className="img" />
                    <p>Товар</p>
                </NavLink>

                <NavLink to="/admin/panel/registration-setting" className={setActive}>
                    <Registration className="img" />
                    <p>Записи</p>
                    <p className={s.register}>{quanty}</p>
                </NavLink>

                <NavLink to="/admin/panel/blog-setting" className={setActive}>
                    <Blog className="img" />
                    <p>Блог</p>
                </NavLink>

                <Link to="/domain/home">
                    <Exit />
                    <p>Выход</p>
                </Link>
            </div>
        </div>
    );
};
export default NavigationPanelDesktop;
