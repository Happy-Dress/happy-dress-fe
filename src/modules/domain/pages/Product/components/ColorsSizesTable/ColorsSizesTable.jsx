import React from 'react';
import s from './ColorsSizesTable.module.scss';
import classNames from 'classnames';
import PropTypes from 'prop-types';

const ColorsSizesTable = (props) => {
    const {
        uniqueColors,
        sizes,
        product,
        currentColorSize,
        handleSizeClick,
    } = props;

    const getColorBackgroundStyle = (colorName) => {
        const color = product.productColorSizes.find(item => item.color.name === colorName).color;
        if (color.secondColor) {
            return `linear-gradient( -45deg, ${color.firstColor}, ${color.firstColor} 49%, white 49%, white 51%, ${color.secondColor} 51% )`;
        }
        return color.firstColor;
    };

    return (
        <div className={s.Table}>
            <table>
                <tbody>
                    {uniqueColors.map((color, key) => (
                        <tr
                            key={key}
                            className={
                                color === currentColorSize.color.name ? s.Table_current_column : ''
                            }
                        >
                            <td className={s.Table_color_wrapper}>
                                <div
                                    className={s.Table_color}
                                    style={{ background: getColorBackgroundStyle(color) }}
                                />
                            </td>
                            {sizes.map((size, key) => (
                                <td
                                    key={key}
                                >
                                    <div
                                        className={classNames(
                                            s.Table_item,
                                            product.productColorSizes
                                                .filter(item => item.color.name === color)
                                                .some(item => item.size.sizeValue === size) ? s.Table_item_available : '',
                                            (size === currentColorSize?.size && color === currentColorSize?.color.name)
                                                ? s.Table_item_current : '',
                                        )}
                                        data-testid={`test-${color}-${size}-item`}
                                        onClick={() => handleSizeClick(color, size)}
                                    >
                                        {size}
                                    </div>
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

ColorsSizesTable.propTypes = {
    uniqueColors: PropTypes.array.isRequired,
    sizes: PropTypes.array.isRequired,
    product: PropTypes.object.isRequired,
    currentColorSize: PropTypes.object.isRequired,
    handleSizeClick: PropTypes.func.isRequired,
};

export default ColorsSizesTable;