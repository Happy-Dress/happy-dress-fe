import React, { useState } from 'react';
import s from './ProductCardDesktop.module.scss';
import PropTypes from 'prop-types';
import { ReactComponent as EmptyCheckbox } from '../../../../../../../../../common/assets/images/EmptyCheckbox.svg';
import { ReactComponent as Checkbox } from '../../../../../../../../../common/assets/images/checkbox.svg';
import { PRODUCT_CARD_DICTIONARY } from '../ProductCard.dictionary';

const {
    PRODUCT_CARD_CATEGORY_TITLE,
    PRODUCT_CARD_COLOR_TITLE,
    PRODUCT_CARD_SIZE_TITLE
} = PRODUCT_CARD_DICTIONARY;

const ProductCardDesktop = ({
    product,
    clickHandler,
    isActive
}) => {
    const [isMouseOver, setIsMouseOver] = useState(false);
    return (
        <div
            className={s.ProductCardDesktop}
            onMouseEnter={() => setIsMouseOver(true)}
            onMouseLeave={() => setIsMouseOver(false)}
            onClick={clickHandler}
        >
            {(isMouseOver && !isActive) && <EmptyCheckbox className={s.checkbox} data-testid={'empty checkbox'}/>}
            {(isActive) && <Checkbox className={s.checkbox} data-testid={'active checkbox'}/>}
            <img src={product.imageUrl} alt="dress preview" className={(isMouseOver ? s.hovered : '')}/>
            <div className={s.content}>
                <h3>{ product.name }</h3>
                <div className={s.property}>
                    <p>{PRODUCT_CARD_COLOR_TITLE}</p>
                    <div className={s.colors}>
                        {
                            product.colors.map(color => <span key={ color } style={{ backgroundColor: `${color}` }} />)
                        }
                    </div>
                </div>
                <div className={s.property}>
                    <p>{PRODUCT_CARD_SIZE_TITLE}</p>
                    <div className={s.sizes}>
                        {
                            product.sizes.map(size => <span key={size}>{size}</span>)
                        }
                    </div>
                </div>
                <div className={s.property}>
                    <p>{PRODUCT_CARD_CATEGORY_TITLE}</p>
                    <div className={s.category}>
                        { product.category }
                    </div>
                </div>
            </div>
        </div>
    );
};

ProductCardDesktop.propTypes = {
    product: PropTypes.object.isRequired,
    clickHandler: PropTypes.func.isRequired,
    isActive: PropTypes.bool.isRequired
};

export default ProductCardDesktop;