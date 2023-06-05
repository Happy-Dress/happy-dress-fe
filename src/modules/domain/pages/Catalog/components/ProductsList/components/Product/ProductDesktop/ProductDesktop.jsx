import React, { useEffect, useState } from 'react';
import s from './ProductDesktop.module.scss';
import Loader from '../../../../../../../../../common/ui/components/Loader';
import classNames from 'classnames';
import { PRODUCT_DICTIONARY } from '../Product.dictionary';
import { Breadcrumbs } from '../../../../../../../../../common/ui/components/Breadcrumbs';
import ColorsSizesTable from '../components/ColorsSizesTable';
import SizesTable from '../components/SizesTable';
import { useDispatch, useSelector } from 'react-redux';
import { setCategory } from '../../../../../../../../../common/ui/store/slices/productsSearchSlice';
import PropTypes from 'prop-types';
import {
    fetchProduct,
    setCurrentColorSize, setProductColorImages,
    setSelectedImage
} from '../../../../../../../../../common/ui/store/slices/productSlice';

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
        productId,
    } = props;

    const product = useSelector(state => state.product.product);
    const selectedImage = useSelector(state => state.product.selectedImage);
    const productColorImages = useSelector(state => state.product.productColorImages);
    const currentColorSize = useSelector(state => state.product.currentColorSize);
    const uniqueColors = useSelector(state => state.product.uniqueColors);
    const mainImage = useSelector(state => state.product.mainImage);

    const [moveUp, setMoveUp] = useState(false);
    const [moveDown, setMoveDown] = useState(false);
    const [isOpenTableSize, setIsOpenTableSize] = useState(false);
    const [breadcrumbs, setBreadcrumbs] = useState([]);

    const dispatch = useDispatch();


    useEffect(() => {
        if (!product) {
            dispatch(fetchProduct({ productId }));
        } else {
            const breadcrumbs = [
                { id: 1, link: '../catalog', linkTitle: 'Каталог' },
                {
                    id: 2,
                    link: '../catalog',
                    linkTitle: product?.category.name,
                    handleOnClick: () => dispatch(setCategory(product?.category))
                },
                { id: 3, link: `../catalog/${product?.id}`, linkTitle: product?.name },
            ];
            setBreadcrumbs(breadcrumbs);
        }
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
            {product ?
                <div className={s.Product_wrapper}>
                    <div className={s.Breadcrumbs_wrapper}>
                        <Breadcrumbs breadcrumbs={breadcrumbs}/>
                    </div>
                    <div className={s.Product}>
                        <div className={s.Product_carousel}>
                            <div className={s.Product_carousel_list}>
                                <div className={classNames(
                                    s.Product_carousel_list_item,
                                    mainImage === selectedImage.imageUrl ? s.Product_carousel_list_item_current : '',
                                )}
                                onClick={() => handleImageClick(mainImage, 0)}
                                >
                                    <img
                                        src={mainImage}
                                        alt="main image"
                                    />
                                </div>
                                {productColorImages.imageURLs.map((imageUrl, key) => (
                                    <div key={key}>
                                        {imageUrl !== mainImage && (
                                            <div className={classNames(
                                                s.Product_carousel_list_item,
                                                imageUrl === selectedImage.imageUrl ? s.Product_carousel_list_item_current : ''
                                            )}
                                            onClick={() => handleImageClick(imageUrl, key + 1)}
                                            >
                                                <img
                                                    src={imageUrl}
                                                    alt={`product image color ${productColorImages.color.name}`}
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
                                <img
                                    src={selectedImage.imageUrl}
                                    alt="selected image"
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
                                        uniqueColors={Array.from(JSON.parse(uniqueColors))}
                                        sizes={SIZES}
                                        product={product}
                                        currentColorSize={currentColorSize}
                                        handleSizeClick={handleSizeClick}
                                    />
                                </div>
                                <div className={s.Product_description_size}>
                                    <h4 onClick={handleOpenTableSize}>{TABLE_SIZE_LABEL}</h4>
                                    {isOpenTableSize && (
                                        <div>
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
                :
                <Loader/>
            }
        </>
    );
};

ProductDesktop.propTypes = {
    productId: PropTypes.number.isRequired,
};
export default ProductDesktop;