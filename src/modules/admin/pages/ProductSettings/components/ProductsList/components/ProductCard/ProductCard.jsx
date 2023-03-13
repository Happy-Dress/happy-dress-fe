import React, { useState } from 'react';
import s from './ProductCard.module.scss';
import image from '../../../../../../../../common/assets/images/photo_4_3.png';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { PRODUCT_CARD_DICTIONARY } from './ProductCard.dictionary';
import { ReactComponent as EmptyCheckbox } from '../../../../../../../../common/assets/images/EmptyCheckbox.svg';
import { ReactComponent as Checkbox } from '../../../../../../../../common/assets/images/checkbox.svg';
import { useDispatch, useSelector } from 'react-redux';
import { selectProduct, unSelectProduct } from '../../../../../../../../common/ui/store/slices/productsSearchSlice';

const {
    SIZE,
    COLOR
} = PRODUCT_CARD_DICTIONARY;

const ProductCard = (props) => {
    const {
        product,
        className
    } = props;

    const [isHover, setIsHover] = useState(false);
    const dispatch = useDispatch();
    const isSelected = useSelector(state => state.productsSearch.selectedProducts.includes(product.id));

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

    return (
        <div
            className={classNames(s.ProductCard, className, { [s.active]: isSelected })}
            onMouseEnter={() => setIsHover(true)}
            onMouseLeave={() => setIsHover(false)}
            onClick={clickHandler}
        >
            <img src={image} alt="dress preview" className={classNames({ [s.hovered]: isHover })}/>
            <div className={s.description}>
                {
                    (isHover && !isSelected) && <EmptyCheckbox className={s.checkbox}/>
                }
                {
                    isSelected && <Checkbox className={s.checkbox}/>
                }
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
    className: PropTypes.string,
    isAdmin: PropTypes.bool
};

export default ProductCard;
