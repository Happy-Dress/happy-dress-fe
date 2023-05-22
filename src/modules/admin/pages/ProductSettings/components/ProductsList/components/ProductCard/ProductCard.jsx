import React, { useState } from 'react';
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

    const handleTouchStart = () => {
        setIsLongPress(false);
        setTimeout(() => {
            setIsLongPress(true);
        }, 800);
    };

    const handleTouchEnd = () => {
        isLongPress && isMobile ? clickHandler() : setIsLongPress(false);
        setIsLongPress(false);
    };

    const { isMobile } = useDeviceTypeContext();

    const { product, className } = props;

    const [isHover, setIsHover] = useState(false);
    const dispatch = useDispatch();
    const isSelected = useSelector((state) =>
        state.productsSearch.selectedProducts.includes(product.id)
    );

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
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
        >
            <img
                src={image}
                alt="dress preview"
                className={classNames({ [s.hovered]: isHover })}
            />
            <div className={s.description}>
                {((isHover && !isSelected) || (isMobile && !isSelected)) && (
                    <>
                        {!isMobile ? (
                            <EmptyCheckbox onClick={clickHandler} className={s.checkbox} />
                        ) : (
                            <EmptyCheckbox className={s.checkbox} />
                        )}
                        <Update className={s.update} />
                    </>
                )}

                {isSelected && (
                    <Checkbox
                        onClick={!isMobile && clickHandler}
                        onTouchStart={isMobile && handleTouchStart}
                        onTouchEnd={isMobile && handleTouchEnd}
                        className={s.checkbox}
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
