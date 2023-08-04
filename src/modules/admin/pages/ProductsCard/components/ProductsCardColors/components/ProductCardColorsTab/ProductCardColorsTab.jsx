import React from 'react';
import s from './ProductCardColorsTab.module.scss';
import PropTypes from 'prop-types';
import ColorTab from './components/ColorTab';
import AvailabilitySizeTab from './components/AvailabilitySizeTab';
import { ReactComponent as Trash } from '../../../../../../../../common/assets/images/Trash.svg';

const ProductCardColorsTab = ({ 
    currentColor, 
    productColors,
    productSizes,
    allSizes,
    optionsColors,
    handleDelete, 
    handleChangeColor,
    handleChangeSize,
    idx 
}) => {
    return(
        <div className={s.ProductCardColorsTab}>
            <div className={s.ProductCardColorsTab_list}>
                <div className={s.ProductCardColorsTab_item}>
                    <ColorTab
                        currentColor={currentColor}
                        productColors={productColors}
                        optionsColors={optionsColors}
                        handleChangeColor={handleChangeColor}
                        idx={idx}
                    />
                </div>
                {allSizes.map((size, index) => (
                    <div key={index} className={s.ProductCardColorsTab_item}>
                        <AvailabilitySizeTab
                            idx={`${size.sizeValue}${currentColor.id}${index}`}
                            isAvailable={productSizes.some(item => item.sizeValue === size.sizeValue)}
                            size={size}
                            handleChangeSize={(e) => handleChangeSize(currentColor, size, e.target.value)}
                        />
                    </div>
                ))}
            </div>
            <div className={s.ProductCardColorsTab_trash} onClick={handleDelete}>
                <Trash/>
            </div>
        </div>
    );
};

ProductCardColorsTab.propTypes = {
    currentColor: PropTypes.object.isRequired,
    productColors: PropTypes.array.isRequired,
    productSizes: PropTypes.array.isRequired,
    allSizes: PropTypes.array.isRequired,
    optionsColors: PropTypes.array.isRequired,
    handleDelete: PropTypes.func.isRequired,
    handleChangeColor: PropTypes.func.isRequired,
    handleChangeSize: PropTypes.func.isRequired,
    idx: PropTypes.string,
};

export default ProductCardColorsTab;