import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Loader from '../../../../../../../../../common/ui/components/Loader';
import s from './ProductMobile.module.scss';
import leftArrow from '../../../../../../../../../assets/images/leftArrow.svg';
import classNames from 'classnames';
import { PRODUCT_DICTIONARY } from '../Product.dictionary';
import ColorsSizesTable from '../components/ColorsSizesTable';
import SizesTable from '../components/SizesTable';
import { useSwipeable } from 'react-swipeable';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import {
    fetchProduct,
    setCurrentColorSize, setProductColorImages,
    setSelectedImage
} from '../../../../../../../../../common/ui/store/slices/productSlice';

const {
    MODEL_LABEL,
    MATERIAL_LABEL,
    COLOR_AND_SIZE_LABEL,
    TABLE_SIZE_LABEL,
    TABLE_SIZE_HEAD,
    TABLE_SIZE_BODY,
    SIZES,
} = PRODUCT_DICTIONARY;

const ProductMobile = (props) => {
    const {
        productId,
    } = props;

    const product = useSelector(state => state.product.product);
    const selectedImage = useSelector(state => state.product.selectedImage);
    const productColorImages = useSelector(state => state.product.productColorImages);
    const currentColorSize = useSelector(state => state.product.currentColorSize);
    const uniqueColors = useSelector(state => state.product.uniqueColors);
    const mainImage = useSelector(state => state.product.mainImage);

    const [moveLeft, setMoveLeft] = useState(false);
    const [moveRight, setMoveRight] = useState(false);
    const [images, setImages] = useState([]);
    const [isOpenTableSize, setIsOpenTableSize] = useState(false);

    const dispatch = useDispatch();

    const handleSwipe = useSwipeable({
        onSwipedLeft: () => {
            setMoveLeft(true);
            const newIndex = (selectedImage.index + 1) % images.length;
            dispatch(setSelectedImage({
                imageUrl: images[newIndex],
                index: newIndex,
            }));
            setTimeout(() => {
                setMoveLeft(false);
            }, 1000);

        },
        onSwipedRight: () => {
            setMoveRight(true);
            const newIndex = (selectedImage.index + images.length - 1) % images.length;
            dispatch(setSelectedImage({
                imageUrl: images[newIndex],
                index: newIndex,
            }));
            setTimeout(() => {
                setMoveRight(false);
            }, 1000);
        },
    });

    useEffect(() => {
        if (!product) {
            dispatch(fetchProduct({ productId }));
        } else {
            // eslint-disable-next-line no-unsafe-optional-chaining
            setImages([product?.mainImageUrl, ...product?.productColorImages[0].imageURLs]);
        }
    }, [product]);

    const handleOpenTableSize = () => {
        window.scrollTo({ top: 0 });
        setIsOpenTableSize(!isOpenTableSize);
    };

    const handleImageClick = (imageUrl, index) => {
        selectedImage.index < index ? setMoveLeft(true)
            :
            selectedImage.index > index ? setMoveRight(true) : null;
        dispatch(setSelectedImage({
            imageUrl,
            index,
        }));
        setTimeout(() => {
            setMoveLeft(false);
            setMoveRight(false);
        }, 1000);
    };

    const handleSizeClick = (color, size) => {
        const productColorSize = product.productColorSizes.filter(item => item.color.name === color).find(item => item.size.sizeValue === size);
        if (productColorSize) {
            const newProductColorSize = {
                ...productColorSize,
                size
            };
            dispatch(setCurrentColorSize(newProductColorSize));
            if (productColorImages.color.name !== productColorSize.color.name) {
                const productColorImage = product.productColorImages.find(productColorImage => productColorImage.color.name === productColorSize.color.name);
                dispatch(setProductColorImages(productColorImage));
                setImages([mainImage, ...productColorImage.imageURLs]);
            }
        }
    };

    return (
        <div>
            {product ?
                !isOpenTableSize ?
                    <div className={s.ProductMobile}>
                        <Link to={'../catalog'}>
                            <div className={s.ProductMobile_return}>
                                <img src={leftArrow} alt={'return arrow'}/>
                                <h4>{product.name}</h4>
                            </div>
                        </Link>
                        <div className={s.ProductMobile_carousel}>
                            <div className={s.ProductMobile_carousel_swipeable} {...handleSwipe}>
                                <div className={classNames(
                                    s.ProductMobile_carousel_selected_item,
                                    moveRight && s.ProductMobile_carousel_selected_item_right,
                                    moveLeft && s.ProductMobile_carousel_selected_item_left,
                                )}>
                                    <img src={selectedImage.imageUrl} alt={'selected image'}/>
                                </div>
                            </div>
                            <div className={s.ProductMobile_carousel_list}>
                                {images.map((imageUrl, key) => (
                                    <div className={classNames(
                                        s.ProductMobile_carousel_list_item,
                                        imageUrl === selectedImage.imageUrl ? s.ProductMobile_carousel_list_item_current : ''
                                    )}
                                    key={key}
                                    onClick={() => handleImageClick(imageUrl, key + 1)}
                                    >
                                        <img
                                            src={imageUrl}
                                            alt={`product image color ${productColorImages.color.name}`}
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className={s.ProductMobile_description}>
                            <div className={s.ProductMobile_description_item}>
                                <p>{product.description}</p>
                            </div>
                            <div className={s.ProductMobile_description_item}>
                                <h5 className={s.ProductMobile_description_label}>{MODEL_LABEL}</h5>
                                <p>{product.model.name}</p>
                            </div>
                            <div className={s.ProductMobile_description_item}>
                                <h5 className={s.ProductMobile_description_label}>{MATERIAL_LABEL}</h5>
                                <p>{product.materials.map(material => material.name).join(', ')}</p>
                            </div>
                            <div className={s.ProductMobile_description_item}>
                                <h5 className={s.ProductMobile_description_label}>{COLOR_AND_SIZE_LABEL}</h5>
                            </div>
                            <div className={s.ProductMobile_description_tableColors}>
                                <ColorsSizesTable
                                    uniqueColors={Array.from(JSON.parse(uniqueColors))}
                                    sizes={SIZES}
                                    product={product}
                                    currentColorSize={currentColorSize}
                                    handleSizeClick={handleSizeClick}
                                />
                            </div>
                        </div>
                        <div className={s.ProductMobile_description_size} onClick={handleOpenTableSize}>
                            <p>{TABLE_SIZE_LABEL}</p>
                        </div>
                    </div>
                    :
                    <div className={s.ProductMobile}>
                        <div className={s.ProductMobile_return} onClick={handleOpenTableSize}>
                            <img src={leftArrow} alt={'return arrow'}/>
                            <h4>{TABLE_SIZE_LABEL}</h4>
                        </div>
                        <SizesTable
                            tableSizeHead={TABLE_SIZE_HEAD}
                            tableSizeBody={TABLE_SIZE_BODY}
                        />
                    </div>
                : <Loader/>
            }
        </div>
    );
};

ProductMobile.propTypes = {
    productId: PropTypes.number.isRequired,
};

export default ProductMobile;