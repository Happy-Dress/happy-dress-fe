import React from 'react';
import s from './AddProductCardMobile.module.scss';
import { ReactComponent as AddIconHover } from '../../../../../../../../../common/assets/images/AddIcon(hover).svg';

const AddProductCardDesktop = () => {
    return (
        <div
            className={s.AddProductCardMobile}
        >
            <AddIconHover />
        </div>
    );
};

export default AddProductCardDesktop;