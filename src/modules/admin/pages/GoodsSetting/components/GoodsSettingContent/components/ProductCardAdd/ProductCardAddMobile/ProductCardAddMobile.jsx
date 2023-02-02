import React from 'react';
import s from './ProductCardAddMobile.module.scss';
import { ReactComponent as AddIconHover } from '../../../../../../../../../common/assets/images/AddIconHover.svg';
import PropTypes from 'prop-types';

const ProductCardAddMobile = ({ onClick }) => {
    return (
        <div
            className={s.AddProductCardMobile}
            onClick={onClick}
        >
            <AddIconHover />
        </div>
    );
};


ProductCardAddMobile.propTypes = {
    onClick: PropTypes.func.isRequired
};

export default ProductCardAddMobile;