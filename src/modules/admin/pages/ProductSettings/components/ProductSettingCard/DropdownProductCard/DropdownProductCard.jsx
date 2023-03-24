import React, { useState } from 'react';
import PropTypes from 'prop-types';
import s from './DropdownProductCard.module.scss';
import { ReactComponent as ArrowDown } from '../../../../../../../common/assets/images/arrowDown.svg';

const DropdownProductCard = ({ data }) => {
    const [isOpened, setIsOpened] = useState(false);
    return (
        <div className={s.DropdownProductCard}>
            <div className={s.DropdownProductCard_inputWrapper}>
                <input
                    type="text"
                    className={s.DropdownProductCard_input}
                    placeholder="не выбрано"
                    disabled={true}
                />

                <ArrowDown
                    className={isOpened ? s.active : s.arrow}
                    onClick={() => {
                        setIsOpened(!isOpened);
                    }}
                />
            </div>
            <div className={isOpened ? s.items_active : s.items}>
                {data.map((item, i) => (
                    <div key={i} className={s.DropdownProductCard_select}>
                        <input type="checkbox" className={s.DropdownProductCard_checkbox} />
                        <span className={s.DropdownProductCard_text}>{item.name}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};
DropdownProductCard.propTypes = {
    children: PropTypes.element,
    data: PropTypes.array,
};

export default DropdownProductCard;
