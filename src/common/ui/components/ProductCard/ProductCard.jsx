import React from 'react';
import s from './ProductCard.module.scss';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { PRODUCT_CARD_DICTIONARY } from './ProductCard.dictionary';
import { useNavigate } from 'react-router-dom';
import ColorCircle from '../ColorCircle';
import ProductImage from '../ProductImage';

const {
    SIZE,
    COLOR
} = PRODUCT_CARD_DICTIONARY;

const ProductCard = (props) => {
    const {
        product,
        className,
    } = props;

    const navigate = useNavigate();

    const sizes = Array.from(
        new Set([
            ...product.productColorSizes.map(
                (colorSize) => colorSize.size.sizeValue
            ),
        ])
    );
    const colors = Array.from(
        new Map(
            product.productColorSizes
                .map((colorSize) => colorSize.color)
                .map((obj) => [obj.id, obj])
        ).values()
    );

    const handleOpenClick = () => {
        window.scrollTo({ top: 0 });
        navigate(`${product.id}`);
    };

    return (
        <div
            className={classNames(s.ProductCard, className)}
            data-testid={'product-card'}
            onClick={handleOpenClick}
        >
            <div className={s.ProductCard_mainImage}>
                <ProductImage
                    imageUrl={product.mainImageUrl}
                    alt="dress preview"
                    widthSkeleton={'300px'}
                    heightSkeleton={'400px'}
                />
            </div>
            <div className={s.description}>
                <h3>{product.name}</h3>
                <div className={s.options}>
                    <div className={classNames(s.sizes, s.optionItem)}>
                        <p>{SIZE}</p>
                        <div className={s.items}>
                            {sizes.map((item, key) => {
                                return <span key={key}>{item}</span>;
                            })}
                        </div>
                    </div>
                    <div className={classNames(s.colors, s.optionItem)}>
                        <p>{COLOR}</p>
                        <div className={s.items}>
                            {
                                colors.map((color) => {
                                    return (
                                        <ColorCircle
                                            key={color.id}
                                            firstColor={color.firstColor}
                                            secondColor={color?.secondColor}
                                            width={'20px'}
                                            height={'20px'}
                                        />
                                    );
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
    className: PropTypes.string,
};

export default ProductCard;
