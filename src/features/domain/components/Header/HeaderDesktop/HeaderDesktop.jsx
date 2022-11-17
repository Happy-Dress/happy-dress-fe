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
            <div className={s.Header_left_part}>
                <span className={s.Header_logo}>{HEADER_LOGO}</span>
            </div>
            <div className={s.Header_central_part}>
                <ul className={s.Header_central_part_menu}>
                    {HEADER_NAV_ITEMS.map((item)=>(
                        <li key={item}>
                            <Typography classNames={[s.Header_central_part_menu_item]}>{item}
                            </Typography>
                        </li>))
                    }
                </ul>
            </div>
            <div className={s.Header_right_part}></div>
        </div>
    );
};

export default HeaderDesktop;
