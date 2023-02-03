import s from './SettingListItem.module.scss';
import { ReactComponent as Delete } from '../../../../../../../assets/images/delete.svg';
import { ReactComponent as Pencil } from '../../../../../../../assets/images/pencil.svg';

const SettingListItem = () =>{
    return (
        <div className={s.SettingListItem}>

            <div className={s.itemValueArea}>
                <input
                    className={s.checkBox}
                    type="checkbox"
                />
                <span className={s.itemValue}>Пышное</span>
            </div>

            <div className={s.itemControlArea}>
                <Pencil className={s.controlIcon}/>
                <Delete className={s.controlIcon}/>
            </div>

        </div>
    );
};

export default SettingListItem;
