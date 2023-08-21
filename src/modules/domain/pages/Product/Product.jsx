import React, { useEffect, useMemo, useState } from 'react';
import adaptive from '../../../../common/ui/hocs/adaptive';
import ProductDesktop from './ProductDesktop';
import ProductMobile from './ProductMobile/ProductMobile';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProduct, setLoadingImages } from '../../../../common/ui/store/slices/productSlice';
import Loader from '../../../../common/ui/components/Loader';
import EmptyBanner from '../../../../common/ui/components/EmptyBanner';
import s from './Product.module.scss';


const Product = () => {
    const { id: productId } = useParams();
    const product = useSelector(state => state.product.product);
    const selectedImage = useSelector(state => state.product.selectedImage);
    const productColorImages = useSelector(state => state.product.productColorImages);
    const currentColorSize = useSelector(state => state.product.currentColorSize);
    const uniqueColors = useSelector(state => state.product.uniqueColors);
    const mainImageUrl = useSelector(state => state.product.mainImageUrl);
    const loadingImages = useSelector(state => state.product.loadingImages);
    const dispatch = useDispatch();

    const [isProductExists, setIsProductExists] = useState(true);

    useEffect(() => {
        dispatch(fetchProduct({ productId, isSecure: false }))
            .unwrap()
            .catch(() => setIsProductExists(false));
    }, []);

    const AdaptiveProduct = useMemo(() => adaptive(ProductDesktop, ProductMobile), []);
    
    const handleOnLoad = (index) => {
        const tempLoadingImages = [...loadingImages];
        tempLoadingImages[index] = true;
        dispatch(setLoadingImages(tempLoadingImages));
    };

    return (
        <>
            {isProductExists ?
                product ? 
                    <AdaptiveProduct
                        product={product}
                        productColorImages={productColorImages}
                        currentColorSize={currentColorSize}
                        uniqueColors={JSON.parse(uniqueColors)}
                        mainImageUrl={mainImageUrl}
                        selectedImage={selectedImage}
                        loadingImages={loadingImages}
                        handleImageOnLoad={handleOnLoad}
                    />
                    :
                    <Loader/>
                :
                <div className={s.EmptyBanner}>
                    <EmptyBanner/>
                </div>
            }
        </>
    );
};

export default Product;