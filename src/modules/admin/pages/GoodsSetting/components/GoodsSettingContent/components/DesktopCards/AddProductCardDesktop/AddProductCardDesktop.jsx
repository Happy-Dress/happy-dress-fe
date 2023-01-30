import React, { useState } from 'react';
import s from './AddProductCardDesktop.module.scss';
import { ReactComponent as AddIconNormal } from '../../../../../../../../../common/assets/images/AddIcon(normal).svg';
import { ReactComponent as AddIconHover } from '../../../../../../../../../common/assets/images/AddIcon(hover).svg';

const AddProductCardDesktop = () => {
    const [isMouseOver, setIsMouseOver] = useState(false);
    return (
        <div
            className={s.AddProductCardDesktop}
            onMouseEnter={() => setIsMouseOver(true)}
            onMouseLeave={() => setIsMouseOver(false)}
        >
            {isMouseOver ? <AddIconHover /> : <AddIconNormal />}
        </div>
    );
};

export default AddProductCardDesktop;