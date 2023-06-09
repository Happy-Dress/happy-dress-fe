import React from 'react';
import s from './ProductCard.module.scss';
import image from '../../../assets/images/photo_4_3.png';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { PRODUCT_CARD_DICTIONARY } from './ProductCard.dictionary';
import { useNavigate } from 'react-router-dom';

const {
    SIZE,
    COLOR
} = PRODUCT_CARD_DICTIONARY;

const ProductCard = (props) => {
    const {
        product,
        className
    } = props;

    const navigate = useNavigate();

    const sizes = Array.from(new Set([...product.productColorSizes.map(colorSize => colorSize.size.sizeValue)]));
    const colors = Array.from(new Set([...product.productColorSizes.map(colorSize => colorSize.color)]));

    const handleOpenClick = () => {
        navigate(`${product.id}`);
    };

    return (
        <div
            className={classNames(s.ProductCard, className)}
            onClick={handleOpenClick}
        >
            <img src={image} alt="dress preview"/>
            <div className={s.description}>
                <h3>{product.name}</h3>
                <div className={s.options}>
                    <div className={classNames(s.sizes, s.optionItem)}>
                        <p>{SIZE}</p>
                        <div className={s.items}>
                            {
                                sizes.map((item, key) => {
                                    return <span key={key}>{item}</span>;
                                })
                            }
                        </div>
                    </div>
                    <div className={classNames(s.colors, s.optionItem)}>
                        <p>{COLOR}</p>
                        <div className={s.items}>
                            {
                                colors.map((item, key) => {
                                    return <span key={key} style={{ backgroundColor: item.firstColor }}/>;
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
