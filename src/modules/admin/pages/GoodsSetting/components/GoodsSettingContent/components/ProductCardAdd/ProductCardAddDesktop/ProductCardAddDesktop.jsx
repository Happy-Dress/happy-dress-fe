import React, { useState } from 'react';
import s from './ProductCardAddDesktop.module.scss';
import { ReactComponent as AddIconNormal } from '../../../../../../../../../common/assets/images/AddIconNormal.svg';
import { ReactComponent as AddIconHover } from '../../../../../../../../../common/assets/images/AddIconHover.svg';
import PropTypes from 'prop-types';

const ProductCardAddDesktop = ({ onClick }) => {
    const [isMouseOver, setIsMouseOver] = useState(false);
    return (
        <div
            className={s.AddProductCardDesktop}
            onMouseEnter={() => setIsMouseOver(true)}
            onMouseLeave={() => setIsMouseOver(false)}
            onClick={onClick}
        >
            {isMouseOver ? <AddIconHover data-testid={'hover icon'}/> : <AddIconNormal data-testid={'normal icon'}/>}
        </div>
    );
};

ProductCardAddDesktop.propTypes = {
    onClick: PropTypes.func.isRequired
};

export default ProductCardAddDesktop;