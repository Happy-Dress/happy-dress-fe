import React from 'react';
import s from './ProductCard.module.scss';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { PRODUCT_CARD_DICTIONARY } from './ProductCard.dictionary';
import { useNavigate } from 'react-router-dom';
import ColorCircle from '../ColorCircle';
import EnhancedImage from '../Image/EnchancedImage';
import { resetProduct } from '../../store/slices/productSlice';
import { useDispatch } from 'react-redux';

const {
    SIZE,
    COLOR
} = PRODUCT_CARD_DICTIONARY;

const ProductCard = (props) => {
    const {
        product,
        colorId,
        sizeId,
        className,
    } = props;

    const navigate = useNavigate();
    const dispatch = useDispatch();

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
        if (colorId && sizeId){ navigate(`${product.id}?colorId=${colorId}&sizeId=${sizeId}`); }
        else navigate(`${product.id}`);
        dispatch(resetProduct());
    };

    return (
        <div
            id={`product-${product.id}-card`}
            className={classNames(s.ProductCard, className)}
            data-testid={'product-card'}
            onClick={handleOpenClick}
        >
            <div className={s.ProductCard_mainImage}>
                <EnhancedImage
                    imageUrl={product.mainImageUrl}
                    alt="dress preview"
                    shouldDisplayTextError={true}
                />
            </div>
            <div className={s.description}>
                <div className={s.description_name}>
                    <h3>{product.name}</h3>
                </div>
                <div className={s.options}>
                    <div className={classNames(s.sizes, s.optionItem)}>
                        <p>{SIZE}</p>
                        <div className={s.items}>
                            {sizes.sort().map((item, key) => {
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
    colorId: PropTypes.number,
    sizeId: PropTypes.number,
    className: PropTypes.string,
};

export default ProductCard;
