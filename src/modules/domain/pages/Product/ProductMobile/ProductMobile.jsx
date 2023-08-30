import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import s from './ProductMobile.module.scss';
import leftArrow from '../../../../../assets/images/leftArrow.svg';
import classNames from 'classnames';
import { PRODUCT_DICTIONARY } from '../Product.dictionary';
import ColorsSizesTable from '../components/ColorsSizesTable';
import SizesTable from '../components/SizesTable';
import { useSwipeable } from 'react-swipeable';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import {
    setSelectedImage
} from '../../../../../common/ui/store/slices/productSlice';
import EnhancedImage from '../../../../../common/ui/components/Image/EnchancedImage';
import ColorCircle from '../../../../../common/ui/components/ColorCircle';

const {
    MODEL_LABEL,
    MATERIAL_LABEL,
    CURRENT_COLOR_LABEL,
    COLOR_AND_SIZE_LABEL,
    TABLE_SIZE_LABEL,
    TABLE_SIZE_HEAD,
    TABLE_SIZE_BODY,
    SIZES,
} = PRODUCT_DICTIONARY;

const ProductMobile = (props) => {
    const {
        product,
        productColorImages,
        currentColorSize,
        uniqueColors,
        selectedImage,
        mainImageUrl,
        handleSizeClick,
    } = props;

    const [moveLeft, setMoveLeft] = useState(false);
    const [moveRight, setMoveRight] = useState(false);
    const [images, setImages] = useState([mainImageUrl, ...productColorImages.imageURLs]);
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
        setImages([product.mainImageUrl, ...productColorImages.imageURLs]);
    }, [productColorImages]);

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

    return (
        <div>
            {!isOpenTableSize ?
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
                                <EnhancedImage
                                    imageUrl={selectedImage.imageUrl}
                                    alt={'selected image'}
                                    shouldDisplayTextError={true}
                                    isZoomable={true}
                                />
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
                                    <EnhancedImage
                                        imageUrl={imageUrl}
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
                            <h5 className={s.ProductMobile_description_label}>{CURRENT_COLOR_LABEL}</h5>
                            <ColorCircle 
                                firstColor={currentColorSize.color.firstColor}
                                secondColor={currentColorSize.color?.secondColor}
                                width={'18px'}
                                height={'18px'}
                            />
                            <p>{currentColorSize.color.name}</p>
                        </div>
                        <div className={s.ProductMobile_description_item}>
                            <h5 className={s.ProductMobile_description_label}>{COLOR_AND_SIZE_LABEL}</h5>
                        </div>
                        <div className={s.ProductMobile_description_tableColors}>
                            <ColorsSizesTable
                                uniqueColors={uniqueColors}
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
                    <div
                        className={s.ProductMobile_return}
                        onClick={handleOpenTableSize}
                    >
                        <img src={leftArrow} alt={'return arrow'}/>
                        <h4>{TABLE_SIZE_LABEL}</h4>
                    </div>
                    <div data-testid={'size-table'}>
                        <SizesTable
                            tableSizeHead={TABLE_SIZE_HEAD}
                            tableSizeBody={TABLE_SIZE_BODY}
                        />
                    </div>
                </div>
            }
        </div>
    );
};

ProductMobile.propTypes = {
    product: PropTypes.object.isRequired,
    productColorImages: PropTypes.object.isRequired,
    currentColorSize: PropTypes.object.isRequired,
    uniqueColors: PropTypes.array.isRequired,
    mainImageUrl: PropTypes.string.isRequired,
    selectedImage: PropTypes.object.isRequired,
    handleSizeClick: PropTypes.func.isRequired,
};

export default ProductMobile;