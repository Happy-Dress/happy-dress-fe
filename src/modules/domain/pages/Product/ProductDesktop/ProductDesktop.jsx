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
    setSelectedImage
} from '../../../../../common/ui/store/slices/productSlice';
import EnhancedImage from '../../../../../common/ui/components/Image/EnchancedImage';
import ColorCircle from '../../../../../common/ui/components/ColorCircle';

const {
    DESCRIPTION_LABEL,
    MATERIAL_LABEL,
    MODEL_LABEL,
    COLOR_LABEL,
    SIZE_LABEL,
    CURRENT_COLOR_LABEL,
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
        handleSizeClick,
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
                            {productColorImages.imageURLs.map((imageUrl, key) => (
                                <div
                                    key={key + Date.now() + 1}
                                    className={classNames(
                                        s.Product_carousel_list_item,
                                        imageUrl === selectedImage.imageUrl ? s.Product_carousel_list_item_current : ''
                                    )}
                                    onClick={() => handleImageClick(imageUrl, key + 1)}
                                >
                                    <EnhancedImage
                                        imageUrl={imageUrl}
                                        alt={`product image color ${productColorImages.color.name}`}
                                        widthSkeleton={'102px'}
                                        heightSkeleton={'133px'}
                                    />
                                </div>
                            ))}
                        </div>
                        <div className={classNames(
                            s.Product_carousel_selected_item,
                            moveUp ? s.Product_carousel_selected_item_up : '',
                            moveDown ? s.Product_carousel_selected_item_down : '',
                        )}
                        >
                            <EnhancedImage
                                key={selectedImage.index}
                                imageUrl={selectedImage.imageUrl}
                                alt="selected image"
                                shouldDisplayTextError={true}
                                isZoomable={true}
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
                            <div className={s.Product_description_item}>
                                <h4 className={s.Product_description_label}>{CURRENT_COLOR_LABEL}</h4>
                                <ColorCircle 
                                    firstColor={currentColorSize.color.firstColor}
                                    secondColor={currentColorSize.color?.secondColor}
                                    width={'20px'}
                                    height={'20px'}
                                />
                                <p>{currentColorSize.color.name}</p>
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
    selectedImage: PropTypes.object.isRequired,
    handleSizeClick: PropTypes.func.isRequired,
};
export default ProductDesktop;
