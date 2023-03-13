import React from 'react';
import s from './ProductCard.module.scss';
import image from '../../../assets/images/photo_4_3.png';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { PRODUCT_CARD_DICTIONARY } from './ProductCard.dictionary';

const {
    SIZE,
    COLOR
} = PRODUCT_CARD_DICTIONARY;

const ProductCard = (props) => {
    const {
        product,
        className
    } = props;

    return (
        <div
            className={classNames(s.ProductCard, className)}
        >
            <img src={image} alt="dress preview"/>
            <div className={s.description}>
                <h3>{product.name}</h3>
                <div className={s.options}>
                    <div className={classNames(s.sizes, s.optionItem)}>
                        <p>{SIZE}</p>
                        <div className={s.items}>
                            {
                                product.sizes.map(item => {
                                    return <span key={item}>{item}</span>;
                                })
                            }
                        </div>
                    </div>
                    <div className={classNames(s.colors, s.optionItem)}>
                        <p>{COLOR}</p>
                        <div className={s.items}>
                            {
                                product.colors.map(item => {
                                    return <span key={item} style={{ backgroundColor: item }}/>;
                                })
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

ProductCard.propTypes = {
    product: PropTypes.object.isRequired,
    className: PropTypes.string
};

export default ProductCard;
