import React, { useEffect, useState } from 'react';
import s from './ProductDesktop.module.scss';
import classNames from 'classnames';
import { PRODUCT_DICTIONARY } from '../Product.dictionary';
import { Breadcrumbs } from '../../../../../common/ui/components/Breadcrumbs';
import ColorsSizesTable from '../components/ColorsSizesTable';
import SizesTable from '../components/SizesTable';
import { useDispatch } from 'react-redux';
import { setCategory } from '../../../../../common/ui/store/slices/productsSearchSlice';
import PropTypes from 'prop-types';
import {
    setCurrentColorSize, setProductColorImages,
    setSelectedImage
} from '../../../../../common/ui/store/slices/productSlice';
import ImageSkeleton from '../../../../../common/ui/components/Image/ImageSkeleton';

const {
    DESCRIPTION_LABEL,
    MATERIAL_LABEL,
    MODEL_LABEL,
    COLOR_LABEL,
    SIZE_LABEL,
    SIZES,
    TABLE_SIZE_LABEL,
    TABLE_SIZE_HEAD,
    TABLE_SIZE_BODY,
} = PRODUCT_DICTIONARY;

const ProductDesktop = (props) => {
    const {
        product,
        productColorImages,
        currentColorSize,
        uniqueColors,
        selectedImage,
        mainImageUrl,
        loadingImages,
        handleImageOnLoad,
    } = props;

    const [moveUp, setMoveUp] = useState(false);
    const [moveDown, setMoveDown] = useState(false);
    const [isOpenTableSize, setIsOpenTableSize] = useState(false);
    const [breadcrumbs, setBreadcrumbs] = useState([]);
    const dispatch = useDispatch();


    useEffect(() => {
        const breadcrumbs = [
            { id: 1, link: '../catalog', linkTitle: 'Каталог' },
            {
                id: 2,
                link: '../catalog',
                linkTitle: product?.category.name,
                handleOnClick: () => dispatch(setCategory({ category: product.category, shouldDropProducts: false }))
            },
            { id: 3, link: `../catalog/${product.id}`, linkTitle: product.name },
        ];
        setBreadcrumbs(breadcrumbs);
    }, [product]);

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
            }
        }
    };

    const handleOpenTableSize = () => {
        setIsOpenTableSize(!isOpenTableSize);
    };


    const handleImageClick = (imageUrl, index) => {
        selectedImage.index < index ? setMoveUp(true)
            :
            selectedImage.index > index ? setMoveDown(true) : null;
        dispatch(setSelectedImage({
            imageUrl,
            index,
        }));
        setTimeout(() => {
            setMoveUp(false);
            setMoveDown(false);
        }, 500);
    };

    return (
        <>
            <div className={s.Product_wrapper}>
                <div className={s.Breadcrumbs_wrapper}>
                    <Breadcrumbs breadcrumbs={breadcrumbs}/>
                </div>
                <div className={s.Product}>
                    <div className={s.Product_carousel}>
                        <div className={s.Product_carousel_list}>
                            <div className={classNames(
                                s.Product_carousel_list_item,
                                mainImageUrl === selectedImage.imageUrl ? s.Product_carousel_list_item_current : '',
                            )}
                            onClick={() => handleImageClick(mainImageUrl, 0)}
                            >
                                {!loadingImages[0] ? <ImageSkeleton
                                    width={'100px'}
                                    height={'80px'}
                                /> : <></> }
                                <img
                                    src={mainImageUrl}
                                    alt="main image"
                                    onLoad={() => handleImageOnLoad(0)}
                                    hidden={!loadingImages[0]}
                                />
                            </div>
                            {productColorImages.imageURLs.map((imageUrl, key) => (
                                <div key={key}>
                                    {imageUrl !== mainImageUrl && (
                                        <div className={classNames(
                                            s.Product_carousel_list_item,
                                            imageUrl === selectedImage.imageUrl ? s.Product_carousel_list_item_current : ''
                                        )}
                                        onClick={() => handleImageClick(imageUrl, key + 1)}
                                        >
                                            {!loadingImages[key + 1] ? <ImageSkeleton
                                                width={'100px'}
                                                height={'80px'}
                                            /> : <></> } 
                                            <img
                                                src={imageUrl}
                                                alt={`product image color ${productColorImages.color.name}`}
                                                onLoad={() => handleImageOnLoad(key + 1)}
                                                hidden={!loadingImages[key + 1]}
                                            />
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                        <div className={classNames(
                            s.Product_carousel_selected_item,
                            moveUp ? s.Product_carousel_selected_item_up : '',
                            moveDown ? s.Product_carousel_selected_item_down : '',
                        )}
                        >
                            {!loadingImages[productColorImages.imageURLs.length] ? <ImageSkeleton
                                width={'30vw'}
                                height={'20vh'}
                            /> : <></> }
                            <img
                                src={selectedImage.imageUrl}
                                alt="selected image"
                                onLoad={() => handleImageOnLoad(productColorImages.imageURLs.length)}
                                hidden={!loadingImages[productColorImages.imageURLs.length]}
                            />
                        
                        </div>
                    </div>
                    <div className={s.Product_description_container}>
                        <h2>{product.name}</h2>
                        <div className={s.Product_description}>
                            <div className={s.Product_description_item}>
                                <h4 className={s.Product_description_label}>{DESCRIPTION_LABEL}</h4>
                                <p>{product.description}</p>
                            </div>
                            <div className={s.Product_description_item}>
                                <h4 className={s.Product_description_label}>{MODEL_LABEL}</h4>
                                <p>{product.model.name}</p>
                            </div>
                            <div className={s.Product_description_item}>
                                <h4 className={s.Product_description_label}>{MATERIAL_LABEL}</h4>
                                <p>{product.materials.map(material => material.name).join(', ')}</p>
                            </div>
                            <div className={s.Product_description_table}>
                                <div className={s.Product_description_table_labels}>
                                    <div className={s.Product_description_table_label}>
                                        <h4 className={s.Product_description_label}>{COLOR_LABEL}</h4>
                                    </div>
                                    <div className={s.Product_description_table_label}>
                                        <h4 className={s.Product_description_label}>{SIZE_LABEL}</h4>
                                    </div>
                                </div>
                                <ColorsSizesTable
                                    uniqueColors={uniqueColors}
                                    sizes={SIZES}
                                    product={product}
                                    currentColorSize={currentColorSize}
                                    handleSizeClick={handleSizeClick}
                                />
                            </div>
                            <div className={s.Product_description_size}>
                                <h4 onClick={handleOpenTableSize}>{TABLE_SIZE_LABEL}</h4>
                                {isOpenTableSize && (
                                    <div data-testid={'size-table'}>
                                        <SizesTable
                                            tableSizeHead={TABLE_SIZE_HEAD}
                                            tableSizeBody={TABLE_SIZE_BODY}
                                        />
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

ProductDesktop.propTypes = {
    product: PropTypes.object.isRequired,
    productColorImages: PropTypes.object.isRequired,
    currentColorSize: PropTypes.object.isRequired,
    uniqueColors: PropTypes.array.isRequired,
    mainImageUrl: PropTypes.string.isRequired,
    selectedImage: PropTypes.object.isRequired,
    loadingImages: PropTypes.array.isRequired,
    handleImageOnLoad: PropTypes.func.isRequired,
};
export default ProductDesktop;
