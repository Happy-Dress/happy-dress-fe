import React, { useState } from 'react';
import PropTypes from 'prop-types';
import ProductCardDesktop from './ProductCardDesktop';
import adaptive from '../../../../../../../../common/ui/hocs/adaptive';
import ProductCardMobile from './ProductCardMobile';

const ProductCard = ({ setSelectedItems, selectedItems, product }) => {
    const [isActive, setIsActive] = useState(!!selectedItems.filter(item => item === product.id).length);

    let AdaptiveProductCard = adaptive(ProductCardDesktop, ProductCardMobile);

    const clickHandler = () => {
        setIsActive(!isActive);
        setSelectedItems(prevState => {
            const newState = [...prevState];
            if (!isActive) {
                newState.push(product.id);
                return newState;
            } else {
                return newState.filter(item => item !== product.id);
            }
        });
    };

    return (
        <AdaptiveProductCard
            product={product}
            clickHandler={clickHandler}
            isActive={isActive}
        />
    );
};

ProductCard.propTypes = {
    product: PropTypes.object.isRequired,
    setSelectedItems: PropTypes.func.isRequired,
    selectedItems: PropTypes.array.isRequired
};

export default ProductCard;