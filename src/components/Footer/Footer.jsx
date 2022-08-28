import React from 'react';
import s from './Footer.module.scss';
import Instagram from '../../images/inst.svg';
import Vk from '../../images/vk.svg';
import Telegram from '../../images/tg.svg';

const Footer = () => {
    return(
        <div className={s.Footer}>
            <div className={s.Footer_top}>
                <div className={s.Footer_top_left}>
                    <p className={s.Footer_logo}>HAPPYDRESS</p>
                    <ul className={s.Footer_menu}>
                        <li className={s.Footer_menu__item}>Главная</li>
                        <li className={s.Footer_menu__item}>Каталог</li>
                        <li className={s.Footer_menu__item}>Блог</li>
                        <li className={s.Footer_menu__item}>Контакты</li>
                        <li className={s.Footer_menu__item}>Примерка</li>
                    </ul>
                </div>
                <div className={s.Footer_top_right}>
                    <p>+375 (29) 537 54 78</p>
                    <p>happydress@gmail.com</p>
                    <div className={s.Footer_top_right_socnet}>
                        <img alt='instagram' src={Instagram}/>
                        <img alt='VK' src={Vk}/>
                        <img alt='Telegram' src={Telegram}/>
                    </div>
                </div>
            </div>
            <div className={s.Footer_bottom}>
                <div className={s.Footer_bottom_copyright}>текст рыбка(год).что-то</div>
                <div className={s.Footer_bottom_address}>
                    г.Витебск,
                    <br/>пр-т Фрунзе 81/33, 
                    <br/>ТЦ Эвиком, 2 эт. пав. 500
                </div>
            </div>
        </div>
    );
};

export default Footer;