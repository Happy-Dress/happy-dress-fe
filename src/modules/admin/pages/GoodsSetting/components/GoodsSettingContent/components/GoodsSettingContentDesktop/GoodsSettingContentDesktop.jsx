import React from 'react';
import s from './GoodsSettingContentDesktop.module.scss';
import { useCatalogContext } from '../../../CatalogProvider';
import { ProductCardAdd } from './components/ProductCardAdd';
import { ProductCard } from './components/ProductCard';

const GoodsSettingContentDesktop = () => {
    const { state } = useCatalogContext();

    return (
        <div className={s.GoodsSettingContentDesktop}>
            <ProductCardAdd />
            {
                state.items.map((item) => {
                    return <ProductCard key={item.id} product={item}/>;
                })
            }
        </div>
    );
};

export default GoodsSettingContentDesktop;
