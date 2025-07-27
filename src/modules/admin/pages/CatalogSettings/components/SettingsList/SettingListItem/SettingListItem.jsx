import s from './SettingListItem.module.scss';
import Delete from '../../../../../../../assets/images/delete.svg';
import Pencil from '../../../../../../../assets/images/pencil.svg';
import PropTypes from 'prop-types';

const SettingListItem = ({ setting, onEdit, onRemove, onSelect, onUnSelect }) =>{

    const handleSelect = (event) =>{
        const isChecked = event.target.checked;
        if(isChecked) {
            onSelect(setting);
        } else {
            onUnSelect(setting);
        }
    };

    return (
        <div className={s.SettingListItem}>

            <div className={s.itemValueArea}>
                <input
                    className={s.checkBox}
                    type="checkbox"
                    onClick={handleSelect}
                />
                <span className={s.itemValue}>{setting.name}</span>
            </div>

            <div className={s.itemControlArea}>
                <Pencil onClick={() => onEdit(setting)} className={s.controlIcon}/>
                <Delete onClick={() => onRemove(setting)} className={s.controlIcon}/>
            </div>

        </div>
    );
};

SettingListItem.propTypes = {
    setting: PropTypes.object,
    onEdit: PropTypes.func,
    onRemove: PropTypes.func,
    onSelect: PropTypes.func,
    onUnSelect: PropTypes.func,
};

export default SettingListItem;
