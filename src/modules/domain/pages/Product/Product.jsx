import React, { useEffect, useMemo, useState } from 'react';
import adaptive from '../../../../common/ui/hocs/adaptive';
import ProductDesktop from './ProductDesktop';
import ProductMobile from './ProductMobile';
import { useLocation, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
    fetchProduct,
    setCurrentColorSize,
    setProductColorImages, setSelectedImage
} from '../../../../common/ui/store/slices/productSlice';
import Loader from '../../../../common/ui/components/Loader';
import EmptyBanner from '../../../../common/ui/components/EmptyBanner';
import s from './Product.module.scss';
import { setCount } from '../../../../common/ui/store/slices/ordersSlice';
import { useToasters } from '../../../../common/ui/contexts/ToastersContext';
import { PRODUCT_DICTIONARY } from './Product.dictionary';

const { PRODUCT_ADDED_TO_CART } = PRODUCT_DICTIONARY;

const Product = () => {
    const { id: productId } = useParams();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const colorId = +queryParams.get('colorId');
    const sizeId = +queryParams.get('sizeId');
    const product = useSelector(state => state.product.product);
    const selectedImage = useSelector(state => state.product.selectedImage);
    const productColorImages = useSelector(state => state.product.productColorImages);
    const currentColorSize = useSelector(state => state.product.currentColorSize);
    const uniqueColors = useSelector(state => state.product.uniqueColors);
    const dispatch = useDispatch();
    const [disabledAddToCartBtn, setDisabledAddToCartBtn] = useState(false);
    const { showToasterSuccess } = useToasters();

    const [isProductExists, setIsProductExists] = useState(true);

    const setProductSettings = (colorId, productColorSize) => {
        const colorImages = product.productColorImages.find((colorImage) => colorImage.color.id === colorId);
        dispatch(setProductColorImages(colorImages));
        dispatch(setSelectedImage({
            imageUrl: colorImages.imageURLs[0],
            index: Date.now(),
        }));
        dispatch(setCurrentColorSize(productColorSize));
        changeEnabledAddToCartBtn(productColorSize);
    };

    const setDefaultQueryParams = () => {
        setQueryParams(product.productColorSizes[0].color.id, product.productColorSizes[0].size.id);
    };

    const setQueryParams = (colorId, sizeId) => {
        queryParams.set('colorId', colorId);
        queryParams.set('sizeId', sizeId);
        const newSearch = queryParams.toString();
        const newUrl = `${location.pathname}?${newSearch}`;
        window.history.replaceState(null, '', newUrl);
        const productColorSize = product.productColorSizes.find((colorSize) => colorSize.color.id === colorId && colorSize.size.id === sizeId);
        setProductSettings(colorId, productColorSize);
    };

    const handleCurrentColorSize = () => {
        if (colorId && sizeId) {
            const productColorSize = product.productColorSizes.find((colorSize) => colorSize.color.id === colorId && colorSize.size.id === sizeId);
            productColorSize ? setProductSettings(colorId, productColorSize) : setDefaultQueryParams();
        } else {
            setDefaultQueryParams();
        }
    };

    const handleSizeClick = (color, size) => {
        const currentColorSizes = product.productColorSizes.filter(item => item.color.name === color);
        const productColorSize = size ?
            currentColorSizes.find(item => item.size.sizeValue === size.sizeValue)
            :
            currentColorSizes.sort((a, b) => a.size.sizeValue - b.size.sizeValue)[0];
        if (productColorSize) {
            const newProductColorSize = {
                ...productColorSize,
                size: productColorSize.size
            };

            dispatch(setCurrentColorSize(newProductColorSize));

            if (productColorImages.color.name !== productColorSize.color.name) {
                const productColorImage = product.productColorImages.find(productColorImage => productColorImage.color.name === productColorSize.color.name);
                dispatch(setSelectedImage({
                    imageUrl: productColorImage.imageURLs[0],
                    index: Date.now(),
                }));
                dispatch(setProductColorImages(productColorImage));
            }
            setQueryParams(newProductColorSize.color.id, newProductColorSize.size.id);
            changeEnabledAddToCartBtn(newProductColorSize);
        }
    };

    useEffect(() => {
        product && handleCurrentColorSize();
    }, [product]);

    useEffect(() => {
        dispatch(fetchProduct({ productId, isSecure: false }))
            .unwrap()
            .catch(() => setIsProductExists(false));
    }, []);

    const AdaptiveProduct = useMemo(() => adaptive(ProductDesktop, ProductMobile), []);

    const handleAddToCart = () => {
        const orders = localStorage.getItem('orders');
        let parsedOrders = JSON.parse(orders);

        if (parsedOrders) {
            parsedOrders.push({
                productId: product.id,
                colorSize: currentColorSize,
            });
        } else {
            parsedOrders = [{
                productId: product.id,
                colorSize: currentColorSize,
            }];
        }
        localStorage.setItem('orders', JSON.stringify(parsedOrders));
        dispatch(setCount(parsedOrders.length));
        setDisabledAddToCartBtn(true);
        showToasterSuccess(PRODUCT_ADDED_TO_CART);
    };

    const changeEnabledAddToCartBtn = (colorSize) => {
        const orders = localStorage.getItem('orders');
        let parsedOrders = JSON.parse(orders);
        if (parsedOrders) {
            setDisabledAddToCartBtn(parsedOrders.some(order => order.colorSize.id === colorSize.id));
        } else {
            return setDisabledAddToCartBtn(false);
        }
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
                        selectedImage={selectedImage}
                        handleSizeClick={handleSizeClick}
                        handleAddToCart={handleAddToCart}
                        isAddToCartButtonDisabled={disabledAddToCartBtn}
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