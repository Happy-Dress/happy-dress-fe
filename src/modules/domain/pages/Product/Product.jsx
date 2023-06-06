import React, { useEffect, useMemo } from 'react';
import adaptive from '../../../../common/ui/hocs/adaptive';
import ProductDesktop from './ProductDesktop';
import ProductMobile from './ProductMobile/ProductMobile';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProduct } from '../../../../common/ui/store/slices/productSlice';
import Loader from '../../../../common/ui/components/Loader';


const Product = () => {
    const { id: productId } = useParams();
    const product = useSelector(state => state.product.product);
    const selectedImage = useSelector(state => state.product.selectedImage);
    const productColorImages = useSelector(state => state.product.productColorImages);
    const currentColorSize = useSelector(state => state.product.currentColorSize);
    const uniqueColors = useSelector(state => state.product.uniqueColors);
    const mainImageUrl = useSelector(state => state.product.mainImageUrl);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchProduct({ productId }));
    }, []);

    const AdaptiveComponent = useMemo(() => adaptive(ProductDesktop, ProductMobile), []);

    return (
        <>
            { product ?
                <AdaptiveComponent
                    product={product}
                    productColorImages={productColorImages}
                    currentColorSize={currentColorSize}
                    uniqueColors={JSON.parse(uniqueColors)}
                    mainImageUrl={mainImageUrl}
                    selectedImage={selectedImage}
                />
                :
                <Loader/>
            }
        </>
    );
};

export default Product;