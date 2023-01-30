import React, { useState } from 'react';
import s from './AddProductCard.module.scss';
import { ReactComponent as AddIconNormal } from '../../../../../../../../common/assets/images/AddIcon(normal).svg';
import { ReactComponent as AddIconHover } from '../../../../../../../../common/assets/images/AddIcon(hover).svg';

const AddProductCard = () => {
    const [isMouseOver, setIsMouseOver] = useState(false);
    return (
        <div
            className={s.AddProductCard}
            onMouseEnter={() => setIsMouseOver(true)}
            onMouseLeave={() => setIsMouseOver(false)}
        >
            {isMouseOver ? <AddIconHover /> : <AddIconNormal />}
        </div>
    );
};

export default AddProductCard;