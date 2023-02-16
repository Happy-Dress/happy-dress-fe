import React, { useState } from 'react';
import s from './ProductCardAdd.module.scss';
import { ReactComponent as AddIconNormal } from '../../../../../../../../../../common/assets/images/AddIconNormal.svg';
import { ReactComponent as AddIconHover } from '../../../../../../../../../../common/assets/images/AddIconHover.svg';

const ProductCardAdd = () => {
    const [isHover, setIsHover] = useState(false);
    return (
        <div
            className={s.ProductCardAdd}
            onMouseEnter={() => setIsHover(true)}
            onMouseLeave={() => setIsHover(false)}
        >
            {
                isHover ?
                    <AddIconHover data-testid={'hover'}/>
                    :
                    <AddIconNormal data-testid={'normal'}/>
            }
        </div>
    );
};

export default ProductCardAdd;
