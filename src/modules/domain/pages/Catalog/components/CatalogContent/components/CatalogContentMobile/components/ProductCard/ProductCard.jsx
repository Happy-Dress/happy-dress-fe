import React from 'react';
import s from './ProductCard.module.scss';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { CATALOG_SETTING_DICTIONARY } from '../../../../../../Catalog.dictionary';
import Preview from '../../../../../../../../../../common/assets/images/CardTest3-4.png';

const {
    COLORS,
    SIZES
} = CATALOG_SETTING_DICTIONARY;

const ProductCard = ({ product }) => {
    if(!product) return;

    return (
        <div className={s.ProductCard}>
            <img src={Preview} alt="dress preview" draggable={false}/>
            <div className={s.description}>
                <h3>{product.name}</h3>
                <div className={s.options}>
                    <div className={classNames(s.colors, s.optionItem)}>
                        <p>{COLORS}:</p>
                        <div className={s.items}>
                            {
                                product.colors.map(item => {
                                    return <span key={item} style={{ backgroundColor: item }}/>;
                                })
                            }
                        </div>
                    </div>
                    <div className={classNames(s.sizes, s.optionItem)}>
                        <p>{SIZES}:</p>
                        <div className={s.items}>
                            {
                                product.sizes.map(item => {
                                    return <span key={item}>{item}</span>;
                                })
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

ProductCard.propTypes = {
    product: PropTypes.object.isRequired
};

export default ProductCard;
