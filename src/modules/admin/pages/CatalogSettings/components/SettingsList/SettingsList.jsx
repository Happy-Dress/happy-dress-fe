import React, { useEffect, useState } from 'react';
import s from './SettingsList.module.scss';
import SettingListItem from './SettingListItem/SettingListItem';
import PropTypes from 'prop-types';
import { Reorder } from 'framer-motion';


const SettingsList = ({ settings, handleReorder }) =>{

    const [trackedItems, setTrackedItems] = useState([]);

    useEffect(() => {
        setTrackedItems(settings);
    }, [settings]);



    const onReorder = (items) => {
        setTrackedItems(items);
    };

    return (
        <div className={s.SettingsList}>

            <Reorder.Group
                as="div"
                axys="y"
                values={trackedItems}
                className={s.listArea}
                onReorder={onReorder}
            >
                {(trackedItems).map(setting =>
                    <Reorder.Item
                        as="div"
                        key={setting.orderNumber}
                        draggable={true}
                        value={setting}
                        onDragEnd={() => handleReorder(trackedItems)}
                        dragMomentum={false}
                    >
                        <SettingListItem  setting={setting}/>
                    </Reorder.Item>
                )}
            </Reorder.Group>
        </div>
    );
};

SettingsList.propTypes = {
    settings: PropTypes.array,
    handleReorder: PropTypes.func
};


export default SettingsList;
