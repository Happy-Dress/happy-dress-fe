import React from 'react';
import PropTypes from 'prop-types';
import s from './CatalogContent.module.scss';
import { ProductCard } from './components/ProductCard';

const CatalogContent = ({ items, isLoading }) => {
    if(isLoading) return <p>Loader</p>;

    return (
        <div className={s.CatalogContent}>
            {
                items.map((product) => {
                    return <ProductCard key={product.id} product={product} />;
                })
            }
        </div>
    );
};

CatalogContent.propTypes = {
    items: PropTypes.array.isRequired,
    isLoading: PropTypes.bool.isRequired
};

export default CatalogContent;