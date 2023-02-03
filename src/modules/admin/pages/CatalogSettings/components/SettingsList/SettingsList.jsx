import s from './SettingsList.module.scss';
import SettingListItem from './SettingListItem/SettingListItem';
import { ButtonAccent, ButtonDefault } from '../../../../../../common/ui/components';


const SettingsList = () =>{
    return (
        <div className={s.SettingsList}>

            <button className={s.addButton}>
            +Добавить
            </button>

            <div className={s.listArea}>
                <SettingListItem/>
                <SettingListItem/>
                <SettingListItem/>
                <SettingListItem/>
                <SettingListItem/>
                <SettingListItem/>
            </div>

            <div className={s.buttonArea}>
                <ButtonDefault text='Отмена'/>
                <ButtonAccent text='Сохранить'/>
            </div>
        </div>
    );
};

export default SettingsList;
