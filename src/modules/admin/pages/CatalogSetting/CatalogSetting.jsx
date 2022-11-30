import { useState } from 'react';
import s from './CatalogSetting.module.scss';
import down from '../../../../assets/images/down.svg';
import ButtonDefault from '../../../../common/components/Buttons/ButtonDefault';
import ButtonAccent from '../../../../common/components/Buttons/ButtonAccent';


const CatalogSettings = () => {

    const [items, setItems] = useState([
        {
            name: 'Категории',
            active: false,
            state: []
        },
        {
            name: 'Цвет',
            active: false,
            state: []
        },
        {
            name: 'Материал',
            active: false,
            state: []
        },
        {
            name: 'Модель',
            active: false,
            state: []
        },
    ]);


    return(
        <div className={s.CatalogSettings}>
            <div className={s.Way}>Главная &gt; Управление каталогом</div>
            <h2>Управление каталогом</h2>
            <div className={s.categories}>
                {
                    items.map((el, index) => {return(
                        <div  className={s.category} key={index} >
                            <div className={s.title} onClick={() => setItems(items.map((e, i) => index === i ? { ...e, active: !el.active }: e))}>
                                <h3>{el.name}</h3>
                                <svg className={el.active ? s.active : s.img} xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 256 256"><path fill="#212121" d="M128 184a8.5 8.5 0 0 1-5.7-2.3l-80-80a8.1 8.1 0 0 1 11.4-11.4l74.3 74.4l74.3-74.4a8.1 8.1 0 0 1 11.4 11.4l-80 80a8.5 8.5 0 0 1-5.7 2.3Z"/></svg>                        
                            </div>
                            <div className={el.active ? s.items_active : s.items }>
                            </div>
                        </div>
                    );})
                }    
            </div>
            <div className={s.buttons}>
                <ButtonDefault text='Отмена'/>
                <ButtonAccent text='Сохранить'/>
            </div>
        </div>
    );
};

export default CatalogSettings;


// () => setItems(items.map((e, i) => index === i ? { ...e, active: !el.active }: e))