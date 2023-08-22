import React from 'react';
import PropTypes from 'prop-types';
import s from './ProductsCardGallery.module.scss';
import { PRODUCT_CARD_DICTIONARY } from '../../ProductsCard.dictionary';
import ColorCircle from '../../../../../../common/ui/components/ColorCircle';
import ProductsCardImage from '../ProductsCardImage';
import { useProductImages } from '../../hooks/useProductImages';

const {
    GALLERY_TEXT,
    EMPTY_GALLERY_TEXT,
    EMPTY_IMAGE_URL_OBJECT,
    FIELDS,
} = PRODUCT_CARD_DICTIONARY;

const ProductsCardGallery = ({ productColorImages, setProductColorImages }) => {

    const { isFetching, handleGalleryImg, handleDeleteGalleryImg } = useProductImages(productColorImages, setProductColorImages);

    const isRenderingAddCard = (colorImage) => {
        return colorImage.imageURLs.length === 0 || colorImage.imageURLs[0] !== EMPTY_IMAGE_URL_OBJECT.imageUrl;
    };

    return (
        <div className={s.ProductCardGallery}>
            <h3>{GALLERY_TEXT}</h3>
            {productColorImages.length > 0 ? productColorImages.map((colorImage) => (
                <div
                    key={colorImage.color.id}
                    className={s.ProductCardGallery_item}
                    data-testid={'color-images-item'}
                >
                    <div className={s.ProductCardGallery_item_color}>
                        <ColorCircle 
                            firstColor={colorImage.color.firstColor}
                            secondColor={colorImage.color?.secondColor}
                            width={'20px'}
                            height={'20px'}
                        />
                    </div>
                    <div className={s.ProductCardGallery_item_images}>
                        {colorImage.imageURLs.map((image, index) => (
                            <ProductsCardImage
                                key={index}
                                imageUrl={image}
                                alt={'Фото платья с цветом ' + colorImage.color.name}
                                isLoaded={!isFetching}
                                onDelete={() => handleDeleteGalleryImg(colorImage.color, image)}
                            />
                        ))}
                        {isRenderingAddCard(colorImage) &&
                            <label htmlFor={FIELDS.PRODUCT_COLOR_IMAGES.NAME + colorImage.color.id}>
                                <ProductsCardImage
                                    imageUrl={EMPTY_IMAGE_URL_OBJECT.imageUrl}
                                    alt={'Добавить фото платья с цветом ' + colorImage.color.name}
                                    isLoaded={!isFetching}
                                />
                                <input
                                    type="file"
                                    accept="image/*"
                                    id={FIELDS.PRODUCT_COLOR_IMAGES.NAME + colorImage.color.id}
                                    onChange={(e) => handleGalleryImg(colorImage.color, e)}
                                />
                            </label>
                        }
                    </div>
                </div>
            ))
                :
                <div className={s.ProductCardGallery_empty_text}>
                    <h3>{EMPTY_GALLERY_TEXT}</h3>
                </div>
            }
        </div>  
    );
};

ProductsCardGallery.propTypes = {
    productColorImages: PropTypes.array.isRequired,
    setProductColorImages: PropTypes.func.isRequired,
};

export default ProductsCardGallery;