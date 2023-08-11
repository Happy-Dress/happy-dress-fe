import React from 'react';
import s from './ColorsSizesTable.module.scss';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import ColorCircle from '../../../../../../common/ui/components/ColorCircle';

const ColorsSizesTable = (props) => {
    const {
        uniqueColors,
        sizes,
        product,
        currentColorSize,
        handleSizeClick,
    } = props;

    return (
        <div className={s.Table}>
            <table>
                <tbody>
                    {uniqueColors.map((color, key) => (
                        <tr
                            key={key}
                            className={
                                color.name === currentColorSize.color.name ? s.Table_current_column : ''
                            }
                        >
                            <td className={s.Table_color_wrapper}>
                                <ColorCircle
                                    firstColor={color.firstColor}
                                    secondColor={color?.secondColor}
                                    width={'20px'}
                                    height={'20px'}
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
                                                .filter(item => item.color.name === color.name)
                                                .some(item => item.size.sizeValue === size) ? s.Table_item_available : '',
                                            (size === currentColorSize?.size && color.name === currentColorSize?.color.name)
                                                ? s.Table_item_current : '',
                                        )}
                                        data-testid={`test-${color.name}-${size}-item`}
                                        onClick={() => handleSizeClick(color.name, size)}
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