/* eslint-disable indent */
import React, { useState, useEffect } from 'react';
import s from './NavigationPanel.module.scss';
import './NavigationPanelStyle.css';
import { Link, NavLink } from 'react-router-dom';
import {ReactComponent as Exit} from '../../../assets/images/exit.svg';
import { ReactComponent as Catalog } from '../../../assets/images/catalog.svg';
import { ReactComponent as Goods } from '../../../assets/images/goods.svg';
import { ReactComponent as Registration } from '../../../assets/images/registration.svg';
import { ReactComponent as Blog } from '../../../assets/images/blog.svg';
import HAPPYDRESS from '../../../assets/images/HAPPYDRESS.svg';

function NavigationPanel() {
const [quanty, setQuanty] = useState(0);
const setActive = ({ isActive }) => (isActive ? 'active' : '');

useEffect(() => {
  fetch('https://jsonplaceholder.typicode.com/users/')
    .then((response) => response.json())
    .then((json) =>
    json.forEach(element => 
      setQuanty(prevQuanty=> prevQuanty+element.id)
    ))   
    .catch((err) => console.error('something wrong happened',err));
}, []);

  return (
    <div className={s.navbar}>
      <div className={s.navbarList}>
        <div className={s.logo}>
          <img src={HAPPYDRESS} alt="HAPPYDRESS" />
        </div>

        <NavLink to="/admin/panel/catalog-setting" className={setActive}>
          <Catalog className='img'/>
          <p>Каталог</p>
        </NavLink>

        <NavLink to="/admin/panel/goods-setting" className={setActive}>
          <Goods className='img'/>
          <p>Товар</p>
        </NavLink>

        <NavLink to="/admin/panel/registration-setting" className={setActive}>
          <Registration className='img'/>
          <p>Записи</p>
          <p className={s.register}>{quanty}</p>
        </NavLink>

        <NavLink to="/admin/panel/blog-setting" className={setActive}>
          <Blog className='img'/>
          <p>Блог</p>
        </NavLink>

        <Link to="/domain/home">
          <Exit />
          <p>Выход</p>
        </Link>
      </div>
    </div>
  );
}

export default NavigationPanel;
