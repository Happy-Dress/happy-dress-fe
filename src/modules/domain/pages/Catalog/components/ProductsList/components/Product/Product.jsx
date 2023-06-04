import React from 'react';
import adaptive from '../../../../../../../../common/ui/hocs/adaptive';
import ProductDesktop from './ProductDesktop';
import ProductMobile from './ProductMobile/ProductMobile';
import { useParams } from 'react-router-dom';


const Product = () => {
    const { id: productId } = useParams();
    const AdaptiveComponent = adaptive(ProductDesktop, ProductMobile);

    return (
        <AdaptiveComponent productId={+productId}/>
    );
};


export default Product;