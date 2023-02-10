import React, { useEffect, useState } from 'react';
import s from './SettingsList.module.scss';
import SettingListItem from './SettingListItem/SettingListItem';
import PropTypes from 'prop-types';
import { Reorder } from 'framer-motion';


const SettingsList = ({ settings, handleReorder, onEdit, onRemove, onSelect, onUnSelect }) =>{

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
                layoutScroll
            >
                {(trackedItems).map(setting =>
                    <Reorder.Item
                        as="div"
                        key={setting.orderNumber}
                        draggable={true}
                        value={setting}
                        onDragEnd={() => handleReorder(trackedItems)}
                    >
                        <SettingListItem onEdit={onEdit} setting={setting} onRemove={onRemove} onSelect={onSelect} onUnSelect={onUnSelect}/>
                    </Reorder.Item>
                )}
            </Reorder.Group>
        </div>
    );
};

SettingsList.propTypes = {
    settings: PropTypes.array,
    handleReorder: PropTypes.func,
    onEdit: PropTypes.func,
    onRemove: PropTypes.func,
    onSelect: PropTypes.func,
    onUnSelect: PropTypes.func,
};


export default SettingsList;
