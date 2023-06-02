import React, { useEffect, useState } from 'react';
import s from './ProductDesktop.module.scss';
import { useParams } from 'react-router-dom';
import getCatalogueItem from '../../../../../../../../../common/api/catalogItem/getCatalogItem';
import LoaderFullScreen from '../../../../../../../../../common/ui/components/LoaderFullScreen';
import classNames from 'classnames';
import { PRODUCT_DICTIONARY } from '../Product.dictionary';
import { Breadcrumbs } from '../../../../../../../../../common/ui/components/Breadcrumbs';
import TableColorSizes from '../components/TableColorSizes';
import TableSizes from '../components/TableSizes';
import Loader from '../../../../../../../../../common/ui/components/Loader';

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

const ProductDesktop = () => {
    const { id: productId } = useParams();
    const [selectedImage, setSelectedImage] = useState(null);
    const [mainImage, setMainImage] = useState(null);
    const [productColorImages, setProductColorImages] = useState(null);
    const [product, setProduct] = useState(null);
    const [moveUp, setMoveUp] = useState(false);
    const [moveDown, setMoveDown] = useState(false);
    const [loading, setLoading] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const [currentColorSize, setCurrentColorSize] = useState(null);
    const [uniqueColors, setUniqueColors] = useState(new Set());
    const [isOpenTableSize, setIsOpenTableSize] = useState(false);
    const [breadcrumbs, setBreadcrumbs] = useState([]);


    useEffect(() => {
        getCatalogueItem(productId).then(data => {
            setProduct(data);
            setSelectedImage({
                imageUrl: data.mainImageUrl,
                index: 0,
            });
            setProductColorImages(data.productColorImages[0]);
            setCurrentColorSize(data.productColorSizes[0]);
            setUniqueColors(new Set(data.productColorSizes.map(item => item.color.name)));
            setMainImage(data.mainImageUrl);
            setLoading(Array(Array.from(new Set(data.productColorImages[0].imageURLs)).length + 1).fill(true));
            setIsLoading(true);
            const breadcrumbs = [
                { id: 1, link: '../catalog', linkTitle: 'Каталог' },
                { id: 2, link: '../catalog', linkTitle: data.category.name },
                { id: 3, link: `../catalog/${data.id}`, linkTitle: data.name },
            ];
            setBreadcrumbs(breadcrumbs);
        });
    }, []);

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
            }
        }
    };

    const handleOpenTableSize = () => {
        setIsOpenTableSize(!isOpenTableSize);
    };

    const handleOnLoadImage = (index) => {
        console.log(loading);
        setLoading((prevState) => {
            const newLoading = [...prevState];
            newLoading[index] = false;
            return newLoading;
        });
    };

    const handleImageClick = (imageUrl, index) => {
        selectedImage.index < index ? setMoveUp(true)
            :
            selectedImage.index > index ? setMoveDown(true) : null;
        setSelectedImage({
            imageUrl,
            index,
        });
        setTimeout(() => {
            setMoveUp(false);
            setMoveDown(false);
        }, 500);
    };

    return (
        <>
            {product ?
                <div className={s.Product_wrapper}>
                    <Breadcrumbs breadcrumbs={breadcrumbs}/>
                    <div className={s.Product}>
                        <div className={s.Product_carousel}>
                            <div className={s.Product_carousel_list}>
                                {isLoading && loading[0] && <Loader/>}
                                <div className={classNames(
                                    s.Product_carousel_list_item,
                                    mainImage === selectedImage.imageUrl ? s.Product_carousel_list_item_current : '',
                                )}
                                style={{ display: loading[0] ? 'none' : 'block' }}
                                onClick={() => handleImageClick(mainImage, 0)}
                                >
                                    <img 
                                        src={mainImage}
                                        alt="main image"
                                        onLoad={() => handleOnLoadImage(0)}
                                    />
                                </div>
                                {productColorImages.imageURLs.map((imageUrl, key) => (
                                    <div key={key}>
                                        {isLoading && loading[key] && imageUrl !== mainImage && <Loader/>}
                                        {imageUrl !== mainImage && (
                                            <div className={classNames(
                                                s.Product_carousel_list_item,
                                                imageUrl === selectedImage.imageUrl ? s.Product_carousel_list_item_current : ''
                                            )}
                                            onClick={() => handleImageClick(imageUrl, key + 1)}
                                            style={{ display: loading[key + 1] ? 'none' : 'block' }}
                                            >
                                                <img 
                                                    src={imageUrl}
                                                    alt={`product image color ${productColorImages.color.name}`}
                                                    onLoad={() => handleOnLoadImage(key)}
                                                />
                                            </div>
                                        )
                                        }
                                    </div>
                                ))}
                            </div>
                            {isLoading && loading[2] &&
                                <div className={s.Product_carousel_selected_item}>
                                    <Loader/>
                                </div>
                            }
                            <div className={classNames(
                                s.Product_carousel_selected_item,
                                moveUp ? s.Product_carousel_selected_item_up : '',
                                moveDown ? s.Product_carousel_selected_item_down : '',
                            )}
                            style={{ display: loading[2] ? 'none' : 'block' }}
                            >
                                <img
                                    src={selectedImage.imageUrl}
                                    alt="selected image"
                                    onLoad={() => handleOnLoadImage(2)}
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
                                    <TableColorSizes
                                        uniqueColors={Array.from(uniqueColors)}
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
                                            <TableSizes
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
                <LoaderFullScreen/>
            }
        </>
    );
};
export default ProductDesktop;