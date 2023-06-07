import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import s from './ProductCard.module.scss';
import image from '../../../../../../../../common/assets/images/photo_4_3.png';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { PRODUCT_CARD_DICTIONARY } from './ProductCard.dictionary';
import { ReactComponent as EmptyCheckbox } from '../../../../../../../../common/assets/images/EmptyCheckbox.svg';
import { ReactComponent as Checkbox } from '../../../../../../../../common/assets/images/checkbox.svg';
import { ReactComponent as Update } from '../../../../../../../../common/assets/images/update.svg';
import { useDispatch, useSelector } from 'react-redux';
import { useDeviceTypeContext } from '../../../../../../../../common/ui/contexts/DeviceType';
import {
    selectProduct,
    unSelectProduct,
} from '../../../../../../../../common/ui/store/slices/productsSearchSlice';

const { SIZE, COLOR } = PRODUCT_CARD_DICTIONARY;

const ProductCard = (props) => {
    const [isLongPress, setIsLongPress] = useState(false);
    const [isHover, setIsHover] = useState(false);
    const dispatch = useDispatch();
    const { isMobile } = useDeviceTypeContext();
    const { product, className } = props;
    const isSelected = useSelector((state) =>
        state.productsSearch.selectedProducts.includes(product.id)
    );

    const handleTouchStart = () => {
        setIsLongPress(false);
        setTimeout(() => {
            setIsLongPress(true);
        }, 700);
    };

    const handleTouchEnd = () => {
        isLongPress && isMobile ? clickHandler() : setIsLongPress(false);
        setIsLongPress(false);
    };

    const clickHandler = () => {
        switch (isSelected) {
            case false:
                dispatch(selectProduct(product.id));
                break;
            case true:
                dispatch(unSelectProduct(product.id));
                break;
        }
    };

    const sizes = Array.from(
        new Set([
            ...product.productColorSizes.map((colorSize) => colorSize.size.sizeValue),
        ])
    );
    const colors = Array.from(
        new Set([...product.productColorSizes.map((colorSize) => colorSize.color)])
    );

    return (
        <div
            className={classNames(s.ProductCard, className, {
                [s.active]: isSelected,
            })}
            onMouseEnter={() => setIsHover(true)}
            onMouseLeave={() => setIsHover(false)}
        >
            <img
                src={image}
                alt="dress preview"
                className={classNames({ [s.hovered]: isHover })}
            />
            <div className={s.description}>
                {((isHover && !isSelected) || (isMobile && !isSelected)) && (
                    <>
                        {isMobile ? (
                            <EmptyCheckbox
                                className={s.checkbox}
                                data-testid="empty-checkbox"
                                onTouchStart={isMobile ? handleTouchStart : undefined}
                                onTouchEnd={isMobile ? handleTouchEnd : undefined}
                            />
                        ) : (
                            <EmptyCheckbox
                                onClick={clickHandler}
                                className={s.checkbox}
                                data-testid="empty-checkbox"
                            />
                        )}
                        <Link to={`../product-card/${product.id}`} data-testid="link">
                            <Update className={s.update} />
                        </Link>
                    </>
                )}
                {isSelected && (
                    <Checkbox
                        onClick={!isMobile ? clickHandler : undefined}
                        onTouchStart={isMobile ? handleTouchStart : undefined}
                        onTouchEnd={isMobile ? handleTouchEnd : undefined}
                        className={s.checkbox}
                        data-testid="filled-checkbox"
                    />
                )}
                <h3>{product.name}</h3>
                <div className={s.options}>
                    <div className={classNames(s.sizes, s.optionItem)}>
                        <p>{SIZE}</p>
                        <div className={s.items}>
                            {sizes.map((item) => {
                                return <span key={item}>{item}</span>;
                            })}
                        </div>
                    </div>
                    <div className={classNames(s.colors, s.optionItem)}>
                        <p>{COLOR}</p>
                        <div className={s.items}>
                            {colors.map((item) => {
                                return (
                                    <span
                                        key={item.id}
                                        style={{ backgroundColor: item.firstColor }}
                                        data-testid="color-option"
                                    />
                                );
                            })}
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
    isAdmin: PropTypes.bool,
};

export default ProductCard;
