import React, { useCallback, useEffect, useState } from 'react';
import s from './ProductCardDesktop.module.scss';
import PropTypes from 'prop-types';
import { ReactComponent as EmptyCheckbox } from '../../../../../../../../../common/assets/images/EmptyCheckbox.svg';
import { ReactComponent as Checkbox } from '../../../../../../../../../common/assets/images/checkbox.svg';

const ProductCardDesktop = ({
    previewImage,
    name,
    colors,
    id,
    category,
    sizes,
    setSelectedItems,
    selectedItems
}) => {

    const [isMouseOver, setIsMouseOver] = useState(false);
    const [isActive, setIsActive] = useState(!!selectedItems.filter(item => item === id).length);

    const clickHandler = () => {
        setIsActive(!isActive);
        setSelectedItems(prevState => {
            const newState = [...prevState];
            if(!isActive) {
                newState.push(id);
                return newState;
            } else {
                return newState.filter(item => item !== id);
            }
        });
    };

    return (
        <div
            className={s.ProductCardDesktop}
            onMouseEnter={() => setIsMouseOver(true)}
            onMouseLeave={() => setIsMouseOver(false)}
            onClick={clickHandler}
        >
            {(isMouseOver && !isActive) && <EmptyCheckbox className={s.checkbox}/>}
            {(isActive) && <Checkbox className={s.checkbox}/>}
            <img src={previewImage} alt="dress preview" style={{ filter: isMouseOver ? 'none' : 'saturate(0.5)' }}/>
            <div className={s.content}>
                <h3>{ name }</h3>
                <div className={s.property}>
                    <p>Цвета</p>
                    <div className={s.colors}>
                        {
                            colors.map(color => <span key={ color } style={{ backgroundColor: `${color}` }} />)
                        }
                    </div>
                </div>
                <div className={s.property}>
                    <p>Размеры</p>
                    <div className={s.sizes}>
                        {
                            sizes.map(size => <span key={size}>{size}</span>)
                        }
                    </div>
                </div>
                <div className={s.property}>
                    <p>Категория</p>
                    <div className={s.category}>
                        { category }
                    </div>
                </div>
            </div>
        </div>
    );
};

ProductCardDesktop.propTypes = {
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    colors: PropTypes.array.isRequired,
    sizes: PropTypes.array.isRequired,
    category: PropTypes.string.isRequired,
    previewImage: PropTypes.string.isRequired,
    setSelectedItems: PropTypes.func.isRequired,
    selectedItems: PropTypes.array.isRequired
};

export default ProductCardDesktop;