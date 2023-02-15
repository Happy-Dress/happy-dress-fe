import React from 'react';
import s from './GoodsSettingContentMobile.module.scss';
import { ReactComponent as Trash } from '../../../../../../../../common/assets/images/Trash.svg';
import { useCatalogContext } from '../../../CatalogProvider';
import { ProductCardAdd } from './components/ProductCardAdd';
import { ProductCard } from './components/ProductCard';

const GoodsSettingContentMobile = () => {
    const { state } = useCatalogContext();

    return (
        <div className={s.GoodsSettingContentMobile}>
            <ProductCardAdd />
            {
                state.items.map((item) => {
                    return <ProductCard key={item.id} product={item} />;
                })
            }
            {
                state.selectedItems.length > 0 &&
                <div className={s.trash}>
                    <Trash />
                    <p>{state.selectedItems.length}</p>
                </div>
            }
        </div>
    );
};

export default GoodsSettingContentMobile;
