import React from 'react';
import PropTypes from 'prop-types';
import s from './ProductCard.module.scss';
import testImg from '../../../../../../../../common/assets/images/CardTest3-4.png';
import classNames from 'classnames';
import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {

    return (
        <Link to={'link'} className={s.ProductCard}>
            <img src={testImg} alt="dress preview"/>
            <h2>{product.name}</h2>
            <div className={s.description}>
                <div className={classNames(s.size, s.optionsContainer)}>
                    <p>Размер:</p>
                    <div className={s.options}>
                        {
                            product.sizes.map(size => {
                                return <span key={size}>{size}</span>;
                            })
                        }
                    </div>
                </div>
                <div className={classNames(s.colors, s.optionsContainer)}>
                    <p>Цвета:</p>
                    <div className={s.options}>
                        {
                            product.colors.map(color => {
                                return <span key={color} style={{ backgroundColor: color }}/>;
                            })
                        }
                    </div>
                </div>
            </div>
        </Link>
    );
};

ProductCard.propTypes = {
    product: PropTypes.object.isRequired
};

export default ProductCard;