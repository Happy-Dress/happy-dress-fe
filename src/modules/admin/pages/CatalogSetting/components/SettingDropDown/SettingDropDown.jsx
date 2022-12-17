import s from './SettingDropDown.module.scss';
import React, { useState } from 'react';
import PropTypes from 'prop-types';

const SettingsDropDown = ({ name, children }) =>{

    const [isOpened, setIsOpened] = useState(false);

    return(
        <div className={s.category} >
            <div className={s.title} onClick={() => setIsOpened(!isOpened)}>
                <h3>{name}</h3>
                <svg className={isOpened ? s.active : s.img} xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 256 256"><path/></svg>
            </div>
            <div className={isOpened ? s.items_active : s.items }>
                {children}
            </div>
        </div>
    );
};

SettingsDropDown.propTypes = {
    name: PropTypes.string.isRequired,
    children: PropTypes.element.isRequired
};

export default SettingsDropDown;
