import s from './SettingDropDown.module.scss';
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { ReactComponent as ArrowDown } from '../../../../../../../../common/assets/images/arrowDown.svg';

const SettingsDropDown = ({ name, children }) =>{

    const [isOpened, setIsOpened] = useState(false);

    return(
        <div className={s.category} >
            <div className={s.title} onClick={() => setIsOpened(!isOpened)}>
                <h3>{name}</h3>
                <ArrowDown className={isOpened ? s.active : ''} />
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
