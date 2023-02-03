import s from './SettingListItem.module.scss';
import { ReactComponent as Delete } from '../../../../../../../assets/images/delete.svg';
import { ReactComponent as Pencil } from '../../../../../../../assets/images/pencil.svg';
import PropTypes from 'prop-types';

const SettingListItem = ({ setting }) =>{
    return (
        <div className={s.SettingListItem}>

            <div className={s.itemValueArea}>
                <input
                    className={s.checkBox}
                    type="checkbox"
                />
                <span className={s.itemValue}>{setting.name}</span>
            </div>

            <div className={s.itemControlArea}>
                <Pencil className={s.controlIcon}/>
                <Delete className={s.controlIcon}/>
            </div>

        </div>
    );
};

SettingListItem.propTypes = {
    setting: PropTypes.object,
};

export default SettingListItem;
