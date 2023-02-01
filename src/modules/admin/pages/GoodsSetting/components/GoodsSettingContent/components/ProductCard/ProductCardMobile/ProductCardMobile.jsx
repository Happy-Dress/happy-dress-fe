import React from 'react';
import s from './ProductCardMobile.module.scss';
import PropTypes from 'prop-types';
import { ReactComponent as Checkbox } from '../../../../../../../../../common/assets/images/checkbox.svg';
import bgImage from '../../../../../../../../../common/assets/images/ZeroBlock/ZeroBlockSM.png';
import { PRODUCT_CARD_DICTIONARY } from '../ProductCard.dictionary';

const {
    PRODUCT_CARD_CATEGORY_TITLE,
    PRODUCT_CARD_COLOR_TITLE,
    PRODUCT_CARD_SIZE_TITLE
} = PRODUCT_CARD_DICTIONARY;

const ProductCardMobile = ({
    product,
    isActive,
    clickHandler
}) => {

    return (
        <div
            className={s.ProductCardMobile}
            onClick={clickHandler}
        >
            {isActive && <Checkbox className={s.checkbox} data-testid={'active checkbox'}/>}
            <img src={product.imageUrl} alt="dress preview"/>
            <div className={s.content}>
                <h3>{ product.name }</h3>
                <div className={s.properties}>
                    <div className={s.property}>
                        <p>{PRODUCT_CARD_COLOR_TITLE}:</p>
                        <div className={s.colors}>
                            {
                                product.colors.map(color => <span key={ color } style={{ backgroundColor: `${color}` }} />)
                            }
                        </div>
                    </div>
                    <div className={s.property}>
                        <p>{PRODUCT_CARD_SIZE_TITLE}:</p>
                        <div className={s.sizes}>
                            {
                                product.sizes.map(size => <span key={size}>{size}</span>)
                            }
                        </div>
                    </div>
                    <div className={s.property}>
                        <p>{PRODUCT_CARD_CATEGORY_TITLE}:</p>
                        <div className={s.category}>
                            { product.category }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

ProductCardMobile.propTypes = {
    product: PropTypes.object.isRequired,
    clickHandler: PropTypes.func.isRequired,
    isActive: PropTypes.bool.isRequired
};

export default ProductCardMobile;