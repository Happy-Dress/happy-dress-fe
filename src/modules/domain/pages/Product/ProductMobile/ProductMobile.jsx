import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import s from './ProductMobile.module.scss';
import leftArrow from '../../../../../assets/images/leftArrow.svg';
import { PRODUCT_DICTIONARY } from '../Product.dictionary';
import ColorsSizesTable from '../components/ColorsSizesTable';
import SizesTable from '../components/SizesTable';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import ColorCircle from '../../../../../common/ui/components/ColorCircle';
import { setCategory } from '../../../../../common/ui/store/slices/productsSearchSlice';
import ProductMobileGallerySlider from './components';

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
        handleSizeClick,
    } = props;
    const [isOpenTableSize, setIsOpenTableSize] = useState(false);
    const dispatch = useDispatch();

    const handleOpenTableSize = () => {
        window.scrollTo({ top: 0 });
        setIsOpenTableSize(!isOpenTableSize);
    };
    

    return (
        <div>
            {!isOpenTableSize ?
                <div className={s.ProductMobile}>
                    <Link to={'../catalog'}>
                        <div
                            className={s.ProductMobile_return}
                            onClick={() => dispatch(setCategory({ category: product.category.id, shouldDropProducts: false }))}
                        >
                            <img src={leftArrow} alt={'return arrow'}/>
                            <h4>{product.name}</h4>
                        </div>
                    </Link>
                    <ProductMobileGallerySlider productColorImages={productColorImages}/>
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
    handleSizeClick: PropTypes.func.isRequired,
};

export default ProductMobile;