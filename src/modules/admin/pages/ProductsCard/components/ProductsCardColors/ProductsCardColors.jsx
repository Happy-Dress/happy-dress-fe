import React, { useEffect, useState } from 'react';
import s from './ProductsCardColors.module.scss';
import ProductCardColorsHeader from './components/ProductCardColorsHeader';
import ProductCardColorsAdd from './components/ProductCardColorsAdd';
import PropTypes from 'prop-types';
import ProductCardColorsTab from './components/ProductCardColorsTab';
import { useToasters } from '../../../../../../common/ui/contexts/ToastersContext';
import { PRODUCT_CARD_DICTIONARY } from '../../ProductsCard.dictionary';

const {
    EMPTY_COLOR_OBJECT,
    EMPTY_SIZE_OBJECT,
    COLOR_PROPTYPES,
    SIZE_PROPTYPES,
} = PRODUCT_CARD_DICTIONARY;


const ProductsCardColors = ({ productColorSizes, allColors, allSizes, setProductColorSizes }) => {

    const [colorsWithSizes, setColorsWithSizes] = useState([]);
    const { showToasterError } = useToasters();

    const emptyColor = EMPTY_COLOR_OBJECT;

    useEffect(() => {
        const updatedColorsWithSizes = [];
        productColorSizes?.forEach(({ color, size }) => {
            if (!updatedColorsWithSizes.some(item => item.color.name === color.name)) {
                updatedColorsWithSizes.push({ color, sizes: [] });
            }
            const indexToReplace = updatedColorsWithSizes.findIndex((item) => item.color.name === color.name);
            updatedColorsWithSizes[indexToReplace] = {
                color,
                sizes: [...updatedColorsWithSizes[indexToReplace].sizes, size]
            };
        });
        setColorsWithSizes(updatedColorsWithSizes);
    }, [productColorSizes]);

    useEffect(() => {
        const newProductColorSizes = colorsWithSizes.flatMap(item => {
            if (item.sizes.length === 0) {
                return [{ color: item.color, size: EMPTY_SIZE_OBJECT }];
            } else {
                return item.sizes.map(size => ({ color: item.color, size: size }));
            }
        });
        setProductColorSizes(newProductColorSizes);
    }, [colorsWithSizes]);

    const handleAddTab = () => {
        const productColors = colorsWithSizes.map((item) => item.color);
        const remainColors = allColors.filter(item => !productColors.some(color => color.id === item.id));
        if (checkIsColorUnselected()) {
            showToasterError('Все цвета должны быть выбраны');
        } else if (remainColors.length <= 0) {
            showToasterError('Нет больше цветов для добавления');
        } else {
            const updatedColorsWithSizes = [...colorsWithSizes];
            updatedColorsWithSizes.push({ color: emptyColor, sizes: [] });
            setColorsWithSizes(updatedColorsWithSizes);
        }
    };

    const handleChangeColor = (currentColor, newColorName) => {
        const newColor = allColors.find(item => item.name === newColorName);
        const updatedColorsWithSizes = [...colorsWithSizes];
        const indexToReplace = updatedColorsWithSizes.findIndex((item) => item.color.name === currentColor.name);
        updatedColorsWithSizes[indexToReplace] = {
            color: newColor,
            sizes: [...updatedColorsWithSizes[indexToReplace].sizes]
        };
        setColorsWithSizes(updatedColorsWithSizes);
    };

    const handleChangeSize = (color, size, isAvailable) => {
        const updatedColorsWithSizes = [...colorsWithSizes];
        const index = updatedColorsWithSizes.findIndex((item) => item.color.name === color.name);
        if (isAvailable === 'true') {
            if (index !== -1) {
                updatedColorsWithSizes[index].sizes.push({ ...size });
            } else {
                updatedColorsWithSizes.push({ color, sizes: [{ ...size }] });
            }
        } else {
            if (index !== -1) {
                const sizeIndex = updatedColorsWithSizes[index].sizes.findIndex((item) => item.sizeValue === size.sizeValue);
                if (sizeIndex !== -1) {
                    updatedColorsWithSizes[index].sizes.splice(sizeIndex, 1);
                }
            }
        }
        setColorsWithSizes(updatedColorsWithSizes);
    };

    const handleDelete = (colorToDelete) => {
        const updatedColorsWithSizes = colorsWithSizes.filter((item) => item.color.id !== colorToDelete.id);
        setColorsWithSizes(updatedColorsWithSizes);
    };

    const getRemainColorsWithCurrent = (productColors, allColors, currentColor) => {
        return allColors.filter(item => item.id === currentColor.id || !productColors.some(color => color.id === item.id));
    };

    const checkIsColorUnselected = () => {
        return !!colorsWithSizes.some(item => item.color.name === emptyColor.name);
    };


    return (
        <div className={s.ProductCardColors}>
            <ProductCardColorsHeader sizes={allSizes}/>
            <div className={s.ProductCardColors_tabs}>
                <ProductCardColorsAdd sizes={allSizes} handleAddTab={handleAddTab}/>
                <div className={s.ProductCardColors_tabs_colors}>
                    {colorsWithSizes.map(({ color, sizes }, idx) => (
                        <ProductCardColorsTab
                            key={color.id}
                            currentColor={color}
                            productColors={colorsWithSizes.map((item) => item.color)}
                            productSizes={sizes}
                            allSizes={allSizes}
                            optionsColors={getRemainColorsWithCurrent(colorsWithSizes.map((item) => item.color), allColors, color)}
                            handleDelete={() => handleDelete(color)}
                            handleChangeColor={(e) => handleChangeColor(color, e.target.value)}
                            handleChangeSize={handleChangeSize}
                            idx={`${color.id}_${idx}}`}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

ProductsCardColors.propTypes = {
    productColorSizes: PropTypes.arrayOf(PropTypes.shape({
        COLOR_PROPTYPES,
        SIZE_PROPTYPES,
    })),
    allColors: PropTypes.arrayOf(COLOR_PROPTYPES).isRequired,
    allSizes: PropTypes.arrayOf(SIZE_PROPTYPES).isRequired,
    setProductColorSizes: PropTypes.func.isRequired,
};

export default ProductsCardColors;
