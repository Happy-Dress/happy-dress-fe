import React, { useState } from 'react';
import s from './ProductCard.module.scss';
import PropTypes from 'prop-types';
import { useCatalogContext } from '../../../../../../contexts/CatalogProvider';
import classNames from 'classnames';
import { GOODS_SETTING_DICTIONARY } from '../../../../../../GoodsSetting.dictionary';
import { ReactComponent as Checkbox } from '../../../../../../../../../../common/assets/images/RoundedCheckbox.svg';

const {
    COLORS,
    CATEGORY,
    SIZES
} = GOODS_SETTING_DICTIONARY;

const ProductCard = ({ product }) => {
    const [isSelected, setIsSelected] = useState(false);
    const { selectProductHandler } = useCatalogContext();

    const clickHandler = () => {
        const { add, remove } = selectProductHandler();

        if(isSelected) {
            remove(product.id);
            setIsSelected(false);
        } else {
            add(product.id);
            setIsSelected(true);
        }
    };

    if(!product) return;

    return (
        <div className={classNames(s.ProductCard, isSelected && s.active)} onClick={clickHandler}>
            <img src={product.imageUrl} alt="dress preview" draggable={false}/>
            <div className={s.description}>
                <h3>{product.name}</h3>
                <div className={s.options}>
                    <div className={classNames(s.colors, s.optionItem)}>
                        <p>{COLORS}:</p>
                        <div className={s.items}>
                            {
                                product.colors.map(item => {
                                    return <span key={item} style={{ backgroundColor: item }}/>;
                                })
                            }
                        </div>
                    </div>
                    <div className={classNames(s.sizes, s.optionItem)}>
                        <p>{SIZES}:</p>
                        <div className={s.items}>
                            {
                                product.sizes.map(item => {
                                    return <span key={item}>{item}</span>;
                                })
                            }
                        </div>
                    </div>
                    <div className={classNames(s.category, s.optionItem)}>
                        <p>{CATEGORY}:</p>
                        <div className={s.items}>
                            {product.category}
                        </div>
                    </div>
                </div>
            </div>
            {
                isSelected && <Checkbox className={s.checkbox}/>
            }
        </div>
    );
};

ProductCard.propTypes = {
    product: PropTypes.object.isRequired
};

export default ProductCard;
