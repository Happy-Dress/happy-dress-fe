import React from 'react';
import s from './SettingsList.module.scss';
import SettingListItem from './SettingListItem/SettingListItem';
import PropTypes from 'prop-types';


const SettingsList = ({ settings }) =>{

    return (
        <div className={s.SettingsList}>

            <div className={s.listArea}>
                {(settings || []).map(setting =>  <SettingListItem key={settings.indexOf(setting)} setting={setting}/>)}
            </div>
        </div>
    );
};

SettingsList.propTypes = {
    settings: PropTypes.array,
};


export default SettingsList;
