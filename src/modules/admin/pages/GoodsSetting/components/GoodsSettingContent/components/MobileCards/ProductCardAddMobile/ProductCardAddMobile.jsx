import React from 'react';
import s from './ProductCardAddMobile.module.scss';
import { ReactComponent as AddIconHover } from '../../../../../../../../../common/assets/images/AddIconHover.svg';
import PropTypes from 'prop-types';

const AddProductCardDesktop = ({ onClick }) => {
    return (
        <div
            className={s.AddProductCardMobile}
            onClick={onClick}
        >
            <AddIconHover />
        </div>
    );
};


AddProductCardDesktop.propTypes = {
    onClick: PropTypes.func.isRequired
};

export default AddProductCardDesktop;