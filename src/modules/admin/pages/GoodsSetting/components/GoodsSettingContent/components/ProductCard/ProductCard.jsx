import React, { useState } from 'react';
import s from './ProductCard.module.scss';
import PropTypes from 'prop-types';
import { ReactComponent as EmptyCheckbox } from '../../../../../../../../common/assets/images/EmptyCheckbox.svg';
import { ReactComponent as Checkbox } from '../../../../../../../../common/assets/images/checkbox.svg';

const ProductCard = ({
    previewImage,
    name,
    colors,
    id,
    category,
    sizes,
    setSelectedItems
}) => {

    const [isMouseOver, setIsMouseOver] = useState(false);
    const [isActive, setIsActive] = useState(false);

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
            className={s.ProductCard}
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

ProductCard.propTypes = {
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    colors: PropTypes.array.isRequired,
    sizes: PropTypes.array.isRequired,
    category: PropTypes.string.isRequired,
    previewImage: PropTypes.string.isRequired,
    setSelectedItems: PropTypes.func.isRequired
};

export default ProductCard;