import React from 'react';
import adaptive from '../../../../../../../../common/ui/hocs/adaptive';
import ProductCardAddDesktop from './ProductCardAddDesktop';
import ProductCardAddMobile from './ProductCardAddMobile';
import PropTypes from 'prop-types';

const ProductCardAdd = ({ onClick }) => {

    let AdaptiveProductCardAdd = adaptive(ProductCardAddDesktop, ProductCardAddMobile);

    return (
        <AdaptiveProductCardAdd onClick={onClick}/>
    );
};

ProductCardAdd.propTypes = {
    onClick: PropTypes.func.isRequired
};

export default ProductCardAdd;