import React from 'react';
import s from './ZeroBlock.module.scss';
import ButtonDefault from '../Buttons/ButtonDefault';

const ZeroBlock = () => {
    return(
        <div className={s.ZeroBlock}>
            <div className={s.ZeroBlock_content}>
                <div>
                    <div className={s.ZeroBlock_text}>
                        <h1>HAPPY</h1>
                        <p>В 2019 году Gucci управляла 487 магазинами, в которых работали 17 157 сотрудников, а объем продаж составил 9,628 млрд евро.</p>
                        <p>В 2019 году Gucci управляла 487 магазинами, в которых работали 17 157 сотрудников, а объем продаж составил 9,628 млрд евро.</p>
                        <h1>DRESS</h1>
                    </div>
                    <p className={s.ZeroBlock_text_mobile}>Онлайн примерочная<br/>свадебных платьев</p>
                </div>
                <ButtonDefault  text='Перейти в каталог'/>
            </div>
        </div>
    );
};

export default ZeroBlock;