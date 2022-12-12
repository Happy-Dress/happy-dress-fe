import React from 'react';
import s from './HeaderDesktop.module.scss';
import hanger from '../../../../../assets/images/hanger.svg';
import { HEADER_DICTIONARY } from '../Header.dictionary';
import Typography from '../../../../../common/components/Typography/Typography';

const {
    HEADER_LOGO,
    HEADER_NAV_ITEMS,
    PHONE_NUMBER
} = HEADER_DICTIONARY;

const HeaderDesktop = () => {
    return (
        <div className={s.Header}>
            <div className={s.Header_logo_wrapper}>
                <span className={s.Header_logo_wrapper_logo}>{HEADER_LOGO}</span>
            </div>
            <ul className={s.Header_menu}>
                {HEADER_NAV_ITEMS.map((item)=>(
                    <li key={item}>
                        <Typography classNames={[s.Header_menu_item]}>{item}
                        </Typography>
                    </li>))
                }
            </ul>
            <div className={s.Header_right_side}>
                <img className={s.Header_right_side_hanger} alt="hanger" src={hanger} />
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

export default HeaderDesktop;
