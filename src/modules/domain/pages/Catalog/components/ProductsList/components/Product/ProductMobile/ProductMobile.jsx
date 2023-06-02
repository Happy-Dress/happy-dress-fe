import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import getCatalogueItem from '../../../../../../../../../common/api/catalogItem/getCatalogItem';
import LoaderFullScreen from '../../../../../../../../../common/ui/components/LoaderFullScreen';
import s from './ProductMobile.module.scss';
import leftArrow from '../../../../../../../../../assets/images/leftArrow.svg';
import classNames from 'classnames';
import { PRODUCT_DICTIONARY } from '../Product.dictionary';
import TableColorSizes from '../components/TableColorSizes';
import TableSizes from '../components/TableSizes';
import { useSwipeable } from 'react-swipeable';

const {
    MODEL_LABEL,
    MATERIAL_LABEL,
    COLOR_AND_SIZE_LABEL,
    TABLE_SIZE_LABEL,
    TABLE_SIZE_HEAD,
    TABLE_SIZE_BODY,
    SIZES,
} = PRODUCT_DICTIONARY;

const ProductMobile = () => {
    const { id: productId } = useParams();
    const [selectedImage, setSelectedImage] = useState(null);
    const [product, setProduct] = useState(null);
    const [productColorImages, setProductColorImages] = useState(null);
    const [mainImage, setMainImage] = useState(null);
    const [moveLeft, setMoveLeft] = useState(false);
    const [moveRight, setMoveRight] = useState(false);
    const [images, setImages] = useState([]);

    const [currentColorSize, setCurrentColorSize] = useState(null);
    const [uniqueColors, setUniqueColors] = useState(new Set());
    const [isOpenTableSize, setIsOpenTableSize] = useState(false);

    const handleSwipe = useSwipeable({
        onSwipedLeft: () => {
            setMoveLeft(true);
            const newIndex = (selectedImage.index + 1) % images.length;
            setSelectedImage({
                imageUrl: images[newIndex],
                index: newIndex,
            });
            setTimeout(() => {
                setMoveLeft(false);
            }, 1000);

        },
        onSwipedRight: () => {
            setMoveRight(true);
            const newIndex = (selectedImage.index + images.length - 1) % images.length;
            setSelectedImage({
                imageUrl: images[newIndex],
                index: newIndex,
            });
            setTimeout(() => {
                setMoveRight(false);
            }, 1000);
        },
    });

    useEffect(() => {
        getCatalogueItem(productId).then(data => {
            setProduct(data);
            setMainImage(data.mainImageUrl);
            setProductColorImages(data.productColorImages[0]);
            setCurrentColorSize(data.productColorSizes[0]);
            setUniqueColors(new Set(data.productColorSizes.map(item => item.color.name)));
            setSelectedImage({
                imageUrl: data.mainImageUrl,
                index: 0,
            });
            setImages([data.mainImageUrl, ...data.productColorImages[0].imageURLs]);
        });
    }, []);

    const handleOpenTableSize = () => {
        window.scrollTo({ top: 0 });
        setIsOpenTableSize(!isOpenTableSize);
    };

    const handleImageClick = (imageUrl, index) => {
        selectedImage.index < index ? setMoveLeft(true)
            :
            selectedImage.index > index ? setMoveRight(true) : null;
        setSelectedImage({
            imageUrl,
            index,
        });
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
            setCurrentColorSize(newProductColorSize);
            if (productColorImages.color.name !== productColorSize.color.name) {
                const productColorImage = product.productColorImages.find(productColorImage => productColorImage.color.name === productColorSize.color.name);
                setProductColorImages(productColorImage);
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
                                        <img src={imageUrl}
                                            alt={`product image color ${productColorImages.color.name}`}/>
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
                                <TableColorSizes
                                    uniqueColors={Array.from(uniqueColors)}
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
                        <TableSizes
                            tableSizeHead={TABLE_SIZE_HEAD}
                            tableSizeBody={TABLE_SIZE_BODY}
                        />
                    </div>
                : <LoaderFullScreen/>
            }
        </div>
    );
};

export default ProductMobile;