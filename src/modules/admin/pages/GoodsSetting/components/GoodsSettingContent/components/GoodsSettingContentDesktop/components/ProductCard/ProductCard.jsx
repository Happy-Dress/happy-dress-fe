import React, { useState } from 'react';
import s from './ProductCard.module.scss';
import { ReactComponent as EmptyCheckbox } from '../../../../../../../../../../common/assets/images/EmptyCheckbox.svg';
import { ReactComponent as Checkbox } from '../../../../../../../../../../common/assets/images/RoundedCheckbox.svg';
import { GOODS_SETTING_DICTIONARY } from '../../../../../../GoodsSetting.dictionary';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const {
    COLORS,
    CATEGORY,
    SIZES
} = GOODS_SETTING_DICTIONARY;

const ProductCard = ({ product }) => {
    const [isHover, setIsHover] = useState(false);
    const [isSelected] = useState(false);
    if(!product) return;

    return (
        <div
            className={s.ProductCard}
            onMouseEnter={() => setIsHover(true)}
            onMouseLeave={() => setIsHover(false)}
        >
            <img src={product.imageUrl} alt="bg" className={isHover ? s.active : ''}/>
            <div className={s.description}>
                <h3>{product.name}</h3>
                <div className={s.options}>
                    <div className={classNames(s.colors, s.optionItem)}>
                        <p>{COLORS}</p>
                        <div className={s.items}>
                            {
                                product.colors.map(item => {
                                    return <span key={item} style={{ backgroundColor: item }}/>;
                                })
                            }
                        </div>
                    </div>
                    <div className={classNames(s.sizes, s.optionItem)}>
                        <p>{SIZES}</p>
                        <div className={s.items}>
                            {
                                product.sizes.map(item => {
                                    return <span key={item}>{item}</span>;
                                })
                            }
                        </div>
                    </div>
                    <div className={classNames(s.category, s.optionItem)}>
                        <p>{CATEGORY}</p>
                        <div className={s.items}>
                            {product.category}
                        </div>
                    </div>
                </div>
            </div>
            {
                isHover && (isSelected ? <Checkbox className={s.checkbox}/> : <EmptyCheckbox className={s.checkbox}/>)
            }
        </div>
    );
};

ProductCard.propTypes = {
    product: PropTypes.object.isRequired
};

export default ProductCard;
